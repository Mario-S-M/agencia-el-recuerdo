import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv from 'dotenv';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
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
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Formatear fechas
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('El Recuerdo API')
    .setDescription('API REST para el sistema de gestión de usuarios')
    .setVersion('1.0')
    .addTag('usuarios', 'Operaciones de usuarios')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'El Recuerdo API',
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css',
  });

  // Esperar a que la aplicación arranque
  await AppModule.bootstrap();

  const port = process.env.PORT ?? 3000;
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
