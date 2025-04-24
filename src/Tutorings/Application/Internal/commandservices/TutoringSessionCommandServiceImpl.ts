import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TutoringSession } from 'src/Tutorings/Domain/Model/Aggregate/TutoringSession.entity';
import { CreateTutoringSessionCommand } from '../../../Domain/Model/Command/CreateTutoringSessionCommand';
import { DeleteTutoringCommand } from '../../../Domain/Model/Command/DeleteTutoringCommand';
import { UpdateTutoringCommand } from '../../../Domain/Model/Command/UpdateTutoringCommand';
import { Course } from 'src/Tutorings/Domain/Model/Entities/Course.entity';
import { TutoringSessionCommandService } from '../../../Domain/Services/TutoringSessionCommandService';
import { User } from '../../../../Users/Domain/Model/Aggregates/User.entity';
import { RoleType } from '../../../../Users/Domain/Model/ValueObjects/RoleType';

/**
 * Implementation of the TutoringSessionCommandService for managing tutoring sessions.
 */
@Injectable()
export class TutoringSessionCommandServiceImpl implements TutoringSessionCommandService {
  constructor(
    @InjectRepository(TutoringSession)
    private readonly tutoringSessionRepository: Repository<TutoringSession>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  /**
   * Handles the creation of a new tutoring session based on the provided command.
   * Validates that the course exists, the title matches the course name,
   * and the tutor has a teacher role.
   *
   * @param command the command containing the details for the new tutoring session
   * @return The created TutoringSession, or null if creation fails
   * @throws Error if the specified course does not exist, the title
   * does not match the specified course name, or the tutor does not have a teacher role
   */
  async handle(command: CreateTutoringSessionCommand): Promise<TutoringSession | null>;
  async handle(command: UpdateTutoringCommand): Promise<TutoringSession | null>;
  async handle(command: DeleteTutoringCommand): Promise<void>;
  async handle(command: CreateTutoringSessionCommand | UpdateTutoringCommand | DeleteTutoringCommand): Promise<TutoringSession | null | void> {
    if (command instanceof CreateTutoringSessionCommand) {
      return this.handleCreateTutoringSession(command);
    } 
    else if (command instanceof UpdateTutoringCommand) {
      return this.handleUpdateTutoringSession(command);
    }
    else if (command instanceof DeleteTutoringCommand) {
      return this.handleDeleteTutoringSession(command);
    }
    
    return null;
  }

  /**
   * Handles the creation of a new tutoring session
   */
  private async handleCreateTutoringSession(command: CreateTutoringSessionCommand): Promise<TutoringSession | null> {
    if (!command.tutorId) {
      throw new Error("TutorId cannot be null.");
    }

    const tutor = await this.userRepository.createQueryBuilder('user')
      .where('user.tutorId = :tutorId', { tutorId: command.tutorId })
      .getOne();
      
    if (!tutor) {
      throw new Error("Invalid tutorId: Tutor does not exist.");
    }
    
    if (tutor.roleType !== RoleType.TEACHER) {
      throw new Error("The tutor must have a teacher role.");
    }

    const course = await this.courseRepository.findOneBy({ id: command.courseId });
    if (!course) {
      throw new Error("Invalid courseId: Course does not exist.");
    }

    if (!command.title || command.title.trim() === '') {
      throw new Error("Course name must not be empty.");
    }

    if (course.name.trim() !== command.title.trim()) {
      throw new Error("Course name does not match the courseId provided.");
    }

    // Verificar si ya existe una sesión de tutoría para este tutor y curso
    const existingSessions = await this.tutoringSessionRepository.createQueryBuilder('tutoringSession')
      .where('tutoringSession.tutorId = :tutorId', { tutorId: command.tutorId })
      .andWhere('tutoringSession.course.id = :courseId', { courseId: command.courseId })
      .leftJoinAndSelect('tutoringSession.course', 'course')
      .getMany();

    if (existingSessions.length > 0) {
      throw new Error("The tutor has already created a tutoring session for this course.");
    }

    // Crear y guardar una nueva sesión de tutoría
    const session = new TutoringSession(command, course);
    await this.tutoringSessionRepository.save(session);

    return session;
  }

  /**
   * Handles the update of an existing tutoring session
   */
  private async handleUpdateTutoringSession(command: UpdateTutoringCommand): Promise<TutoringSession | null> {
    const session = await this.tutoringSessionRepository.createQueryBuilder('tutoringSession')
      .where('tutoringSession.id = :id', { id: command.tutoringSessionId })
      .leftJoinAndSelect('tutoringSession.course', 'course')
      .leftJoinAndSelect('tutoringSession.times', 'times')
      .getOne();

    if (!session) {
      throw new Error("Invalid tutoringSessionId: Tutoring session does not exist.");
    }

    session.updateTutoringSessionAttributes(command);
    await this.tutoringSessionRepository.save(session);

    return session;
  }

  /**
   * Handles the deletion of an existing tutoring session
   */
  private async handleDeleteTutoringSession(command: DeleteTutoringCommand): Promise<void> {
    const exists = await this.tutoringSessionRepository.existsBy({ id: command.tutoringId });
    
    if (!exists) {
      throw new Error("Invalid tutoringId: Tutoring session does not exist.");
    }
    
    try {
      await this.tutoringSessionRepository.delete(command.tutoringId);
    } catch (e) {
      throw new Error(`Error while deleting tutoring session: ${e.message}`);
    }
  }
}