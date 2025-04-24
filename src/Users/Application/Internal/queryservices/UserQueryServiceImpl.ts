import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../Domain/Model/Aggregates/User.entity';
import { UserQueryService } from '../../../Domain/Services/UserQueryService';
import { GetUserByRoleQuery } from '../../../Domain/Model/Queries/GetUserByRole';
import { GetUserByEmailPasswordQuery } from '../../../Domain/Model/Queries/GetUserByEmailPassword';
import { GetTutorByEmailQuery } from '../../../Domain/Model/Queries/GetTutorByEmail';
import { GetAllUsersQuery } from '../../../Domain/Model/Queries/GetAllUsersQuery';
import { GetUserByIdQuery } from '../../../Domain/Model/Queries/GetUserById';
import { GetTutorByIdRoleQuery } from '../../../Domain/Model/Queries/GetTutorByIdRole';

/**
 * Service implementation for handling user-related queries.
 * Provides methods to retrieve users by email, role, or retrieve all users.
 */
@Injectable()
export class UserQueryServiceImpl implements UserQueryService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Implementation to handle different query types.
   */
  async handle(query: GetUserByRoleQuery): Promise<User[]>;
  async handle(query: GetUserByEmailPasswordQuery): Promise<User | null>;
  async handle(query: GetTutorByEmailQuery): Promise<User | null>;
  async handle(query: GetAllUsersQuery): Promise<User[]>;
  async handle(query: GetUserByIdQuery): Promise<User | null>;
  async handle(query: GetTutorByIdRoleQuery): Promise<User | null>;
  async handle(query: any): Promise<User | User[] | null> {
    if (query instanceof GetUserByEmailPasswordQuery) {
      return this.handleGetUserByEmailPassword(query);
    } else if (query instanceof GetTutorByEmailQuery) {
      return this.handleGetTutorByEmail(query);
    } else if (query instanceof GetUserByRoleQuery) {
      return this.handleGetUserByRole(query);
    } else if (query instanceof GetAllUsersQuery) {
      return this.handleGetAllUsers(query);
    } else if (query instanceof GetUserByIdQuery) {
      return this.handleGetUserById(query);
    } else if (query instanceof GetTutorByIdRoleQuery) {
      return this.handleGetTutorByIdRole(query);
    }
    return null;
  }

  /**
   * Retrieves a user based on their email address and password.
   *
   * @param query the query containing the email address and password to search.
   * @return the user if found, or null if not found.
   */
  private async handleGetUserByEmailPassword(query: GetUserByEmailPasswordQuery): Promise<User | null> {
    return this.userRepository.createQueryBuilder('user')
      .where('user.email.address = :email', { email: query.emailAddress.address })
      .andWhere('user.password.password = :password', { password: query.password.password })
      .getOne();
  }

  /**
   * Retrieves a user based on their email address.
   *
   * @param query the query containing the email address to search.
   * @return the user if found, or null if not found.
   */
  private async handleGetTutorByEmail(query: GetTutorByEmailQuery): Promise<User | null> {
    return this.userRepository.createQueryBuilder('user')
      .where('user.email.address = :email', { email: query.emailAddress.address })
      .getOne();
  }

  /**
   * Retrieves a list of users with a specified role.
   *
   * @param query the query containing the role type to search for.
   * @return an array of users with the specified role, or an empty array if none found.
   */
  private async handleGetUserByRole(query: GetUserByRoleQuery): Promise<User[]> {
    return this.userRepository.createQueryBuilder('user')
      .where('user.role.roleType = :roleType', { roleType: query.roleType })
      .getMany();
  }

  /**
   * Retrieves all users currently stored in the system.
   *
   * @param query an empty query indicating retrieval of all users.
   * @return an array of all users, or an empty array if no users are found.
   */
  private async handleGetAllUsers(query: GetAllUsersQuery): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param query the query containing the ID to search for.
   * @return the user if found, or null if not found.
   */
  private async handleGetUserById(query: GetUserByIdQuery): Promise<User | null> {
    return this.userRepository.findOneBy({ id: query.userId });
  }

  /**
   * Retrieves a tutor by their ID and role.
   *
   * @param query the query containing the ID and role to search for.
   * @return the user if found, or null if not found.
   */
  private async handleGetTutorByIdRole(query: GetTutorByIdRoleQuery): Promise<User | null> {
    return this.userRepository.createQueryBuilder('user')
      .where('user.tutorId = :tutorId', { tutorId: query.tutorId })
      .andWhere('user.role.roleType = :roleType', { roleType: query.roleType })
      .getOne();
  }
}