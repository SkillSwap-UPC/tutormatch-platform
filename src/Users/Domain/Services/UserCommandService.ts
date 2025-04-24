import { User } from "../Model/Aggregates/User.entity";
import { CreateUserCommand } from "../Model/Command/CreateUserCommand";
import { UpdateUserCommand } from "../Model/Command/UpdateUserCommand";

/**
 * Service interface for handling user-related commands, such as creating a new user.
 */
export interface UserCommandService {
  /**
   * Processes the creation of a new user based on the provided command data.
   *
   * @param command the CreateUserCommand containing details for the new user
   * @return the created User if successful, or null if not
   */
  handle(command: CreateUserCommand): Promise<User | null>;

  /**
   * Updates an existing user based on the provided command data.
   *
   * This method processes the update request and returns the updated User
   * if the operation is successful. If the update fails or the user is not found,
   * null is returned.
   *
   * @param command the UpdateUserCommand containing the user ID and updated details
   * @return the updated User if successful, or null if not
   */
  handle(command: UpdateUserCommand): Promise<User | null>;
}