import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('SkillSwapINC TutorMatch API')
    .setDescription('SkillSwapINC TutorMatch application REST API documentation.')
    .setVersion('v1.0.0')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setExternalDoc(
      'SkillSwapINC TutorMatch Documentation', 
      'https://github.com/SkillSwapINC/TutorMatch-Report'
    )
    .addServer('https://stellar-reflection-production.up.railway.app', 'Railway Server')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('swagger-ui', app, document);
}