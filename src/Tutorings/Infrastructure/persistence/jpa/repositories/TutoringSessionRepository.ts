import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TutoringSession } from 'src/Tutorings/Domain/Model/Aggregate/TutoringSession.entity';

/**
 * Repository interface for managing {@link TutoringSession} entities.
 * Provides basic CRUD operations and includes additional query methods
 * specific to tutoring sessions.
 */
@Injectable()
export class TutoringSessionRepository {
  constructor(
    @InjectRepository(TutoringSession)
    private readonly repository: Repository<TutoringSession>
  ) {}

  /**
   * Find tutoring sessions associated with a specific tutor and course.
   *
   * @param tutorId The tutor ID.
   * @param courseId The course ID.
   * @return A list of tutoring sessions associated with the provided tutor and course.
   */
  async findByTutorIdAndCourseId(tutorId: number, courseId: number): Promise<TutoringSession[]> {
    return this.repository.createQueryBuilder('tutoringSession')
      .leftJoinAndSelect('tutoringSession.course', 'course')
      .leftJoinAndSelect('tutoringSession.times', 'times')
      .where('tutoringSession.tutorId = :tutorId', { tutorId })
      .andWhere('course.id = :courseId', { courseId })
      .getMany();
  }

  /**
   * Finds tutoring sessions associated with a specific cycle.
   *
   * @param cycle The cycle number to filter by.
   * @return A list of tutoring sessions belonging to the specified cycle.
   */
  async findByCycle(cycle: number): Promise<TutoringSession[]> {
    return this.repository.createQueryBuilder('tutoringSession')
      .leftJoinAndSelect('tutoringSession.course', 'course')
      .leftJoinAndSelect('tutoringSession.times', 'times')
      .where('tutoringSession.cycle = :cycle', { cycle })
      .getMany();
  }

  /**
   * Finds all tutoring sessions conducted by a specific tutor.
   *
   * @param tutorId The ID of the tutor.
   * @return A list of tutoring sessions associated with the given tutor.
   */
  async findTutoringByTutorId(tutorId: number): Promise<TutoringSession[]> {
    return this.repository.createQueryBuilder('tutoringSession')
      .leftJoinAndSelect('tutoringSession.course', 'course')
      .leftJoinAndSelect('tutoringSession.times', 'times')
      .where('tutoringSession.tutorId = :tutorId', { tutorId })
      .getMany();
  }

  /**
   * Finds a specific tutoring session by its ID.
   *
   * @param id The ID of the tutoring session to find.
   * @return The found tutoring session, or null if not found.
   */
  async findById(id: number): Promise<TutoringSession | null> {
    return this.repository.createQueryBuilder('tutoringSession')
      .leftJoinAndSelect('tutoringSession.course', 'course')
      .leftJoinAndSelect('tutoringSession.times', 'times')
      .where('tutoringSession.id = :id', { id })
      .getOne();
  }

  /**
   * Finds tutoring sessions associated with a specific course.
   *
   * @param courseId The course ID.
   * @return A list of tutoring sessions associated with the provided course.
   */
  async findByCourseId(courseId: number): Promise<TutoringSession[]> {
    return this.repository.createQueryBuilder('tutoringSession')
      .leftJoinAndSelect('tutoringSession.course', 'course')
      .leftJoinAndSelect('tutoringSession.times', 'times')
      .where('course.id = :courseId', { courseId })
      .getMany();
  }

  // Métodos básicos del repositorio
  async save(tutoringSession: TutoringSession): Promise<TutoringSession> {
    return this.repository.save(tutoringSession);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async findAll(): Promise<TutoringSession[]> {
    return this.repository.find();
  }

  async existsById(id: number): Promise<boolean> {
    const count = await this.repository.countBy({ id });
    return count > 0;
  }
}