import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './Domain/Model/Entities/Course.entity';
import { Semester } from './Domain/Model/Entities/Semester.entity';
import { DailySchedule } from './Domain/Model/Entities/DailySchedule.entity';
import { TutoringSession } from './Domain/Model/Aggregate/TutoringSession.entity';
import { DataLoader } from './Application/Internal/commandservices/DataLoader';
import { DataInitializer } from './Application/Internal/commandservices/DataInitializer';
import { SemesterService } from './Application/Internal/commandservices/SemesterService';
import { TutoringSessionQueryServiceImpl } from './Application/Internal/queryservices/TutoringSessionQueryServiceImpl';
import { CourseQueryServiceImpl } from './Application/Internal/queryservices/CourseQueryServiceImpl';
import { TutoringSessionCommandServiceImpl } from './Application/Internal/commandservices/TutoringSessionCommandServiceImpl';
import { TutoringSessionController } from './Interfaces/rest/TutoringSessionController';
import { CourseController } from './Interfaces/rest/CourseController';
import { TutoringSessionRepository } from './Infrastructure/persistence/jpa/repositories/TutoringSessionRepository';
import { SemesterRepository } from './Infrastructure/persistence/jpa/repositories/SemesterRepository';
import { CourseRepository } from './Infrastructure/persistence/jpa/repositories/CourseRepository';
import { UsersModule } from 'src/Users/Users.module';
import { AvailableHour } from './Domain/Model/Entities/AvailableHour.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course, 
      Semester, 
      DailySchedule,
      AvailableHour,
      TutoringSession
    ]),
    UsersModule,
  ],
  controllers: [
    TutoringSessionController,
    CourseController
  ],
  providers: [
    DataLoader,
    DataInitializer,
    SemesterService,
    TutoringSessionRepository,
    SemesterRepository,
    CourseRepository,
    {
      provide: 'TutoringSessionQueryService',
      useClass: TutoringSessionQueryServiceImpl
    },
    {
      provide: 'CourseQueryService',
      useClass: CourseQueryServiceImpl
    },
    {
      provide: 'TutoringSessionCommandService',
      useClass: TutoringSessionCommandServiceImpl
    }
  ],
  exports: [
    {
      provide: 'TutoringSessionQueryService',
      useClass: TutoringSessionQueryServiceImpl
    },
    {
      provide: 'CourseQueryService',
      useClass: CourseQueryServiceImpl
    },
    {
      provide: 'TutoringSessionCommandService',
      useClass: TutoringSessionCommandServiceImpl
    }
  ]
})
export class TutoringsModule {}