import { calendarioApi } from '../api/calendario.api';
import type { FechaSalidaCalendario } from '../../domain/entities/calendario.types';

export class CalendarioRepository {
  async getActivas(): Promise<FechaSalidaCalendario[]> {
    return calendarioApi.getActivas();
  }
}
