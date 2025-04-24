import { TutoringSession } from '../Model/Aggregate/TutoringSession.entity';
import { GetAllTutoringsQuery } from '../Model/Queries/GetAllTutoringsQuery';
import { GetTutoringBySemesterId } from '../Model/Queries/GetTutoringBySemesterId';
import { GetAllTutoringsByTutorId } from '../Model/Queries/GetAllTutoringsByTutorId';
import { GetTutoringById } from '../Model/Queries/GetTutoringById';
import { GetTutoringByCourseId } from '../Model/Queries/GetTutoringByCourseId';

/**
 * Defines a service for querying tutoring sessions.
 * 
 * Provides methods to retrieve tutoring sessions based on various criteria.
 */
export interface TutoringSessionQueryService {
  /**
   * Retrieves all available tutoring sessions.
   *
   * @param query The query object (unused in this implementation).
   * @return A list of all tutoring sessions.
   */
  handle(query: GetAllTutoringsQuery): Promise<TutoringSession[]>;

  /**
   * Retrieves tutoring sessions associated with a specific semester.
   *
   * @param query The query object containing the semester ID.
   * @return A list of tutoring sessions belonging to the specified semester.
   */
  handle(query: GetTutoringBySemesterId): Promise<TutoringSession[]>;

  /**
   * Retrieves all tutoring sessions conducted by a specific tutor.
   *
   * @param query The query object containing the tutor's ID.
   * @return A list of tutoring sessions associated with the specified tutor.
   */
  handle(query: GetAllTutoringsByTutorId): Promise<TutoringSession[]>;

  /**
   * Retrieves a specific tutoring session by its ID.
   *
   * @param query The query object containing the tutoring session's ID.
   * @return The tutoring session if found, or null otherwise.
   */
  handle(query: GetTutoringById): Promise<TutoringSession | null>;

  /**
   * Retrieves a tutoring session by course ID.
   *
   * @param query The query object containing the course ID.
   * @return The tutoring session if found, or null otherwise.
   */
  handle(query: GetTutoringByCourseId): Promise<TutoringSession | null>;
}