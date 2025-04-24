import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupOpenApi } from './shared/infrastructure/documentation/openapi/configuration/OpenApiConfiguration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  // Habilitar CORS para el desarrollo
  app.enableCors({
    origin: 'https://stellar-reflection-production.up.railway.app', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  });
  
  // Configurar Swagger
  setupOpenApi(app);
  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Application is running on: http://[::1]:${port}`);
  console.log(`Swagger UI is available at: http://[::1]:${port}/swagger-ui/index.html`);

}
bootstrap();