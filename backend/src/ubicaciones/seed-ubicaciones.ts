import { AppDataSource } from '../config/database.config';
import { Pais } from './entities/pais.entity';
import { Estado } from './entities/estado.entity';
import { Municipio } from './entities/municipio.entity';
import * as fs from 'fs';

interface CityData {
  id: number;
  name: string;
  latitude: string | null;
  longitude: string | null;
}

interface StateData {
  id: number;
  name: string;
  state_code: string | null;
  cities: CityData[];
}

interface CountryData {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  phonecode: string;
  native: string | null;
  region: string | null;
  states: StateData[];
}

function cleanRegion(region: string | null): string | null {
  if (!region) return null;
  if (region === 'All') return null;
  return region;
}

const BATCH_SIZE = 500;

export async function seedUbicaciones(): Promise<void> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const paisRepo = AppDataSource.getRepository(Pais);
  const estadoRepo = AppDataSource.getRepository(Estado);
  const municipioRepo = AppDataSource.getRepository(Municipio);

  const existingEstados = await estadoRepo.count();
  if (existingEstados > 0) {
    console.log(
      `Seed: Ya existen ${existingEstados} estados, saltando seed de ubicaciones`,
    );
    return;
  }

  const filePath =
    process.env.GEOJSON_PATH || '/tmp/countries+states+cities.json';
  if (!fs.existsSync(filePath)) {
    console.log(
      `Seed: Archivo ${filePath} no encontrado, saltando ubicaciones`,
    );
    return;
  }

  console.log(`Seed: Cargando datos geográficos desde ${filePath}...`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const countries: CountryData[] = JSON.parse(raw) as CountryData[];
  console.log(`Seed: ${countries.length} países encontrados`);

  // Get or insert countries
  let paisRows: { id: string; codigoIso2: string }[] = await paisRepo.find({
    select: ['id', 'codigoIso2'],
  });
  const paisMapExisting = new Map(paisRows.map((p) => [p.codigoIso2, p.id]));

  const missing = countries.filter((c) => !paisMapExisting.has(c.iso2));
  if (missing.length > 0) {
    console.log(`Seed: Insertando ${missing.length} países faltantes...`);
    const paisValues = missing.map((c) => ({
      nombre: c.name,
      codigoIso2: c.iso2,
      codigoIso3: c.iso3,
      codigoTelefono: c.phonecode ? `+${c.phonecode}` : null,
      nombreNativo: c.native || null,
      continente: cleanRegion(c.region),
    }));

    const inserted = await paisRepo
      .createQueryBuilder()
      .insert()
      .into(Pais)
      .values(paisValues)
      .returning('id')
      .execute();

    missing.forEach((c, i) => {
      paisMapExisting.set(c.iso2, inserted.identifiers[i].id as string);
    });
  }

  // Build final paisId map keyed by iso2
  const paisIdByIso2 = new Map(
    countries
      .filter((c) => paisMapExisting.has(c.iso2))
      .map((c) => [c.iso2, paisMapExisting.get(c.iso2)!]),
  );

  console.log(`Seed: ${paisIdByIso2.size} países disponibles`);

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const qbEstado = queryRunner.manager.getRepository(Estado);
    const qbMunicipio = queryRunner.manager.getRepository(Municipio);

    let totalEstados = 0;
    let totalMunicipios = 0;

    for (let ci = 0; ci < countries.length; ci++) {
      const country = countries[ci];
      const paisId = paisIdByIso2.get(country.iso2);
      if (!paisId) continue;

      const states = country.states ?? [];
      if (states.length === 0) continue;

      for (let si = 0; si < states.length; si += BATCH_SIZE) {
        const batch = states.slice(si, si + BATCH_SIZE);
        const estadoValues = batch.map((s) => ({
          nombre: s.name,
          codigo: s.state_code || null,
          paisId,
        }));

        const estadosInserted = await qbEstado
          .createQueryBuilder()
          .insert()
          .into(Estado)
          .values(estadoValues)
          .returning('id')
          .execute();

        const estadoIds = estadosInserted.identifiers.map(
          (r) => r.id as string,
        );

        for (let eii = 0; eii < batch.length; eii++) {
          const state = batch[eii];
          const estadoId = estadoIds[eii];
          if (!estadoId) continue;

          const cities = state.cities ?? [];
          if (cities.length === 0) continue;

          for (let cii = 0; cii < cities.length; cii += BATCH_SIZE) {
            const cityBatch = cities.slice(cii, cii + BATCH_SIZE);
            const municipioValues = cityBatch.map((city) => ({
              nombre: city.name,
              latitud: city.latitude ? parseFloat(city.latitude) : null,
              longitud: city.longitude ? parseFloat(city.longitude) : null,
              estadoId,
            }));

            await qbMunicipio
              .createQueryBuilder()
              .insert()
              .into(Municipio)
              .values(municipioValues)
              .execute();
          }
          totalMunicipios += cities.length;
        }
      }

      totalEstados += states.length;

      if ((ci + 1) % 20 === 0) {
        console.log(
          `Seed: Procesados ${ci + 1}/${countries.length} países...`,
        );
      }
    }

    await queryRunner.commitTransaction();

    console.log(
      `Seed: Ubicaciones completado: ${countries.length} países, ${totalEstados} estados, ${totalMunicipios} municipios`,
    );
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
