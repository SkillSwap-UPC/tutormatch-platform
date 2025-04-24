import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Domain/Model/Aggregates/User.entity'; // Asegúrate que la ruta sea correcta
import { UserRepository } from './Infrastructure/persistence/jpa/repositories/UserRepository';
import { UsersController } from './Interfaces/rest/UsersController';
import { UserCommandServiceImpl } from './Application/Internal/commandservices/UserCommandServiceImpl';
import { UserQueryServiceImpl } from './Application/Internal/queryservices/UserQueryServiceImpl';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserCommandService',
      useClass: UserCommandServiceImpl
    },
    {
      provide: 'UserQueryService',
      useClass: UserQueryServiceImpl
    },
    UserRepository
  ],
  exports: [
    'UserCommandService',
    'UserQueryService',
    TypeOrmModule,
    UserRepository 
  ]
})
export class UsersModule {}