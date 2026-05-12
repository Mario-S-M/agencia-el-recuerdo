import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv from 'dotenv';
import { Logger } from 'nestjs-pino';
import { join } from 'path';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  // Servir archivos de uploads como assets estáticos
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });
  app.useLogger(app.get(Logger));

  const logger = app.get(Logger);

  // Habilitar validación de entrada
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Habilitar CORS
  const allowedOrigin = process.env.FRONTEND_URL ?? 'http://localhost:3000';
  app.enableCors({
    origin: [allowedOrigin, 'http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: false,
  });

  // Formatear fechas
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('El Recuerdo API')
    .setDescription(
      'API REST para la agencia de viajes El Recuerdo.\n\n' +
        '**Autenticación:** Las rutas de escritura requieren JWT Bearer token. ' +
        'Obtén el token con `POST /auth/login` e introdúcelo en el botón Authorize.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT obtenido en POST /auth/login',
      },
      'JWT',
    )
    .addTag('auth', 'Autenticación — login para obtener JWT')
    .addTag('usuarios', 'Gestión de usuarios (admin)')
    .addTag('destinos', 'Destinos turísticos')
    .addTag('servicios', 'Tipos de servicio (Paquetes al Mar, Vuelos, etc.)')
    .addTag('paquetes', 'Paquetes de viaje')
    .addTag('fechas-salida', 'Fechas de salida por paquete')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'El Recuerdo API',
    customCssUrl:
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css',
  });

  await AppModule.bootstrap();

  try {
    const { runSeed } = await import('./common/seed.js');
    await runSeed();
  } catch (seedError) {
    console.error('Seed error (non-fatal):', seedError);
  }

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log('API Endpoints:');
  logger.log('  - GET    /          - Home');
  logger.log('  - GET    /swagger.json  - Swagger JSON');
  logger.log('  - GET    /swagger      - Swagger UI');
  logger.log('  - GET    /usuarios  - Listar todos los usuarios');
  logger.log('  - GET    /usuarios/:id - Obtener usuario por ID');
  logger.log('  - GET    /usuarios/search?term= - Buscar usuarios');
  logger.log('  - GET    /usuarios/role/:rol - Obtener usuarios por rol');
  logger.log('  - GET    /usuarios/active - Obtener usuarios activos');
  logger.log('  - GET    /usuarios/stats - Estadísticas');
  logger.log('  - POST   /usuarios - Crear nuevo usuario');
  logger.log('  - PATCH  /usuarios/:id - Actualizar usuario');
  logger.log('  - DELETE /usuarios/:id - Eliminar (soft delete)');
  logger.log('  - PATCH  /usuarios/:id/restore - Restaurar usuario');
  logger.log('  - DELETE /usuarios/:id/permanent - Eliminar permanentemente');
}
bootstrap();
