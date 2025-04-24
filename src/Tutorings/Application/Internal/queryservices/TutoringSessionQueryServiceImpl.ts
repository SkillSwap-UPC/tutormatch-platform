import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TutoringSession } from 'src/Tutorings/Domain/Model/Aggregate/TutoringSession.entity';
import { GetAllTutoringsQuery } from '../../../Domain/Model/Queries/GetAllTutoringsQuery';
import { GetTutoringBySemesterId } from '../../../Domain/Model/Queries/GetTutoringBySemesterId';
import { GetAllTutoringsByTutorId } from '../../../Domain/Model/Queries/GetAllTutoringsByTutorId';
import { GetTutoringById } from '../../../Domain/Model/Queries/GetTutoringById';
import { GetTutoringByCourseId } from '../../../Domain/Model/Queries/GetTutoringByCourseId';
import { TutoringSessionQueryService } from '../../../Domain/Services/TutoringSessionQueryService';

/**
 * Service implementation for querying tutoring sessions.
 */
@Injectable()
export class TutoringSessionQueryServiceImpl implements TutoringSessionQueryService {
  constructor(
    @InjectRepository(TutoringSession)
    private readonly tutoringSessionRepository: Repository<TutoringSession>
  ) {}

  /**
   * Handles different types of tutoring session queries based on the query type.
   */
  async handle(query: GetAllTutoringsQuery): Promise<TutoringSession[]>;
  async handle(query: GetTutoringBySemesterId): Promise<TutoringSession[]>;
  async handle(query: GetAllTutoringsByTutorId): Promise<TutoringSession[]>;
  async handle(query: GetTutoringById): Promise<TutoringSession | null>;
  async handle(query: GetTutoringByCourseId): Promise<TutoringSession | null>;
  async handle(query: any): Promise<TutoringSession[] | TutoringSession | null> {
    if (query instanceof GetAllTutoringsQuery) {
      return this.handleGetAllTutorings();
    }
    else if (query instanceof GetTutoringBySemesterId) {
      return this.handleGetTutoringBySemesterId(query);
    }
    else if (query instanceof GetAllTutoringsByTutorId) {
      return this.handleGetAllTutoringsByTutorId(query);
    }
    else if (query instanceof GetTutoringById) {
      return this.handleGetTutoringById(query);
    }
    else if (query instanceof GetTutoringByCourseId) {
      return this.handleGetTutoringByCourseId(query);
    }
    
    return null;
  }

  private async handleGetAllTutorings(): Promise<TutoringSession[]> {
    return this.tutoringSessionRepository.createQueryBuilder('tutoringSession')
      .leftJoinAndSelect('tutoringSession.course', 'course')
      .leftJoinAndSelect('tutoringSession.times', 'times')
      .getMany();
  }

  private async handleGetTutoringBySemesterId(query: GetTutoringBySemesterId): Promise<TutoringSession[]> {
    return this.tutoringSessionRepository.createQueryBuilder('tutoringSession')
      .where('tutoringSession.cycle = :cycle', { cycle: query.cycle })
      .leftJoinAndSelect('tutoringSession.course', 'course')
      .leftJoinAndSelect('tutoringSession.times', 'times')
      .getMany();
  }

  private async handleGetAllTutoringsByTutorId(query: GetAllTutoringsByTutorId): Promise<TutoringSession[]> {
    return this.tutoringSessionRepository.createQueryBuilder('tutoringSession')
      .where('tutoringSession.tutorId = :tutorId', { tutorId: query.tutorId })
      .leftJoinAndSelect('tutoringSession.course', 'course')
      .leftJoinAndSelect('tutoringSession.times', 'times')
      .getMany();
  }

  private async handleGetTutoringById(query: GetTutoringById): Promise<TutoringSession | null> {
    const result = await this.tutoringSessionRepository.createQueryBuilder('tutoringSession')
      .where('tutoringSession.id = :id', { id: query.id })
      .leftJoinAndSelect('tutoringSession.course', 'course')
      .leftJoinAndSelect('tutoringSession.times', 'times')
      .getOne();
      
    return result || null;
  }

  private async handleGetTutoringByCourseId(query: GetTutoringByCourseId): Promise<TutoringSession | null> {
    const results = await this.tutoringSessionRepository.createQueryBuilder('tutoringSession')
      .innerJoin('tutoringSession.course', 'course')
      .where('course.id = :courseId', { courseId: query.courseId })
      .leftJoinAndSelect('tutoringSession.course', 'courseDetail')
      .leftJoinAndSelect('tutoringSession.times', 'times')
      .getMany();
      
    return results.length > 0 ? results[0] : null;
  }
}