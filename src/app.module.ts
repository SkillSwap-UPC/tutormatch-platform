import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeCasePluralizedNamingStrategy } from './shared/infrastructure/persistence/jpa/configuration/strategy/SnakeCaseWithPluralizedTablePhysicalNamingStrategy';
import { RootController } from './shared/interfaces/rest/RootController';
import { AppService } from './app.service';
import { UsersModule } from './Users/Users.module';
import { TutoringsModule } from './Tutorings/Tutorings.module';

import * as crypto from 'crypto';
global.crypto = crypto as any;

@Module({
  controllers: [
    RootController,
  ],
  providers: [
    AppService
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL') || process.env.DATABASE_URL,
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
          __dirname + '/**/Domain/Model/Entities/**/*.entity{.ts,.js}',
          __dirname + '/**/Domain/Model/Aggregate/**/*.entity{.ts,.js}',
          __dirname + '/**/Domain/Model/Aggregates/**/*.entity{.ts,.js}'
        ],
        synchronize: configService.get<boolean>('DATABASE_SYNC') === true,
        ssl: configService.get<boolean>('DATABASE_SSL') === true,
        extra: configService.get<boolean>('DATABASE_SSL') === true ? {
          ssl: {
            rejectUnauthorized: false
          }
        } : {},
        connectTimeoutMS: parseInt(configService.get('DATABASE_TIMEOUT') || '30000'),
        namingStrategy: new SnakeCasePluralizedNamingStrategy(),
        logging: configService.get<boolean>('DATABASE_LOGGING') === true,
      }),
    }),
    UsersModule,
    TutoringsModule
  ],
})
export class AppModule {}