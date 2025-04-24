import { TutoringSession } from '../Model/Aggregate/TutoringSession.entity';
import { CreateTutoringSessionCommand } from '../Model/Command/CreateTutoringSessionCommand';
import { DeleteTutoringCommand } from '../Model/Command/DeleteTutoringCommand';
import { UpdateTutoringCommand } from '../Model/Command/UpdateTutoringCommand';

/**
 * Service interface for handling commands related to tutoring sessions.
 * Provides methods for processing and managing tutoring session commands.
 */
export interface TutoringSessionCommandService {
  /**
   * Handles the creation of a new tutoring session based on the provided command.
   *
   * @param command The CreateTutoringSessionCommand containing
   * the details needed to create a tutoring session.
   * @return The created TutoringSession if successful, or null if not.
   */
  handle(command: CreateTutoringSessionCommand): Promise<TutoringSession | null>;

  /**
   * Handles the update of an existing tutoring session based on the provided command.
   *
   * @param command The UpdateTutoringCommand containing
   * the details needed to update a tutoring session.
   * @return The updated TutoringSession if successful, or null if not.
   */
  handle(command: UpdateTutoringCommand): Promise<TutoringSession | null>;

  /**
   * Handles the deletion of a tutoring session based on the provided command.
   * @param command The DeleteTutoringCommand containing the ID of the tutoring session to delete
   */
  handle(command: DeleteTutoringCommand): Promise<void>;
}