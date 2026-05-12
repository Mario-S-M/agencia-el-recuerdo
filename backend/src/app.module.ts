import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DestinosModule } from './destinos/destinos.module';
import { ServiciosModule } from './servicios/servicios.module';
import { PaquetesModule } from './paquetes/paquetes.module';
import { FechasSalidaModule } from './fechas-salida/fechas-salida.module';
import { UploadsModule } from './uploads/uploads.module';
import { HotelesModule } from './hoteles/hoteles.module';
import { AppDataSource } from './config/database.config';
import { LoggerModule } from 'nestjs-pino';

const DATABASE_INITIALIZATION_RETRY_COUNT = 10;
const DATABASE_INITIALIZATION_RETRY_DELAY_MS = 2000;
const DATABASE_HOST =
  process.env.POSTGRES_HOST || process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = parseInt(
  process.env.POSTGRES_PORT || process.env.DATABASE_PORT || '5432',
  10,
);

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport:
          process.env.NODE_ENV === 'production'
            ? undefined
            : {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                  translateTime: 'SYS:standard',
                },
              },
      },
    }),
    UsersModule,
    AuthModule,
    DestinosModule,
    ServiciosModule,
    PaquetesModule,
    FechasSalidaModule,
    HotelesModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static async bootstrap() {
    let lastError: unknown;

    for (
      let attempt = 1;
      attempt <= DATABASE_INITIALIZATION_RETRY_COUNT;
      attempt += 1
    ) {
      try {
        if (AppDataSource.isInitialized) {
          await AppDataSource.destroy();
        }
        await AppDataSource.initialize();
        console.log('Connected to database:', AppDataSource.options.database);
        return;
      } catch (error: unknown) {
        lastError = error;

        if (attempt < DATABASE_INITIALIZATION_RETRY_COUNT) {
          console.warn(
            `Postgres no responde todavía. Reintentando conexión (${attempt}/${DATABASE_INITIALIZATION_RETRY_COUNT})...`,
          );
          await wait(DATABASE_INITIALIZATION_RETRY_DELAY_MS);
          continue;
        }
      }
    }

    const reason =
      lastError instanceof Error ? lastError.message : 'unknown database error';
    throw new Error(
      `No se pudo conectar a Postgres en ${DATABASE_HOST}:${DATABASE_PORT}. ` +
        `Verifica que el servicio esté levantado y que backend/.env apunte al host correcto. ` +
        `Error original: ${reason}`,
    );
  }
}
