import { User } from '../Model/Aggregates/User.entity';
import { GetUserByRoleQuery } from '../Model/Queries/GetUserByRole';
import { GetUserByEmailPasswordQuery } from '../Model/Queries/GetUserByEmailPassword';
import { GetTutorByEmailQuery } from '../Model/Queries/GetTutorByEmail';
import { GetAllUsersQuery } from '../Model/Queries/GetAllUsersQuery';
import { GetUserByIdQuery } from '../Model/Queries/GetUserById';
import { GetTutorByIdRoleQuery } from '../Model/Queries/GetTutorByIdRole';

/**
 * Service interface for handling user-related queries,
 * such as retrieving users by role or email.
 */
export interface UserQueryService {
  /**
   * Retrieves a list of users that match the specified role.
   *
   * @param query the GetUserByRoleQuery containing the role to filter users by
   * @return an array of User objects that have the specified role
   */
  handle(query: GetUserByRoleQuery): Promise<User[]>;

  /**
   * Retrieves a user by their email address and password.
   *
   * @param query the GetUserByEmailPasswordQuery containing the email address and password to search for
   * @return the User if found, or null if no user matches the email and password
   */
  handle(query: GetUserByEmailPasswordQuery): Promise<User | null>;

  /**
   * Retrieves a user by their email address.
   *
   * @param query the GetTutorByEmailQuery containing the email address to search for
   * @return the User if found, or null if no user matches the email
   */
  handle(query: GetTutorByEmailQuery): Promise<User | null>;

  /**
   * Retrieves a list of all users.
   *
   * @param query the GetAllUsersQuery to fetch all users
   * @return an array of all User objects currently stored
   */
  handle(query: GetAllUsersQuery): Promise<User[]>;

  /**
   * Retrieves a user by their ID.
   *
   * @param query the GetUserByIdQuery containing the ID to search for
   * @return the User if found, or null if no user matches the ID
   */
  handle(query: GetUserByIdQuery): Promise<User | null>;

  /**
   * Retrieves a tutor by their ID and role.
   *
   * @param query the GetTutorByIdRoleQuery containing the ID and role to search for
   * @return the User if found, or null if no user matches the ID and role
   */
  handle(query: GetTutorByIdRoleQuery): Promise<User | null>;
}