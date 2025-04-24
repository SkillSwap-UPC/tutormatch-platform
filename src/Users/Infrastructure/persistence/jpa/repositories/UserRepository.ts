import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../../Domain/Model/Aggregates/User.entity';
import { EmailAddress } from '../../../../Domain/Model/ValueObjects/EmailAddress';
import { Password } from '../../../../Domain/Model/ValueObjects/Password';
import { RoleType } from '../../../../Domain/Model/ValueObjects/RoleType';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Repository for managing User entities.
 * Provides custom query methods beyond the standard CRUD operations.
 */
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  /**
   * Finds a user by their email address and password.
   *
   * @param email The email address of the user to retrieve
   * @param password The password of the user to verify
   * @returns The user if found, or null if not found
   */
  async findByEmailAndPassword(email: EmailAddress, password: Password): Promise<User | null> {
    return this.repository.createQueryBuilder('user')
      .where('user.email.address = :email', { email: email.address })
      .andWhere('user.password.password = :password', { password: password.password })
      .getOne();
  }

  /**
   * Finds a user by their email address.
   *
   * @param email The email address of the user to retrieve
   * @returns The user if found, or null if not found
   */
  async findByEmail(email: EmailAddress): Promise<User | null> {
    return this.repository.createQueryBuilder('user')
      .where('user.email.address = :email', { email: email.address })
      .getOne();
  }

  /**
   * Finds all users with the specified role type.
   *
   * @param roleType The role type to filter users by
   * @returns An array of users with the specified role
   */
  async findByRoleRoleType(roleType: RoleType): Promise<User[]> {
    return this.repository.createQueryBuilder('user')
      .where('user.role.roleType = :roleType', { roleType })
      .getMany();
  }

  /**
   * Finds a user by their tutor ID.
   *
   * @param tutorId The tutor ID of the user to retrieve
   * @returns The user if found, or null if not found
   */
  async findByTutorId(tutorId: number): Promise<User | null> {
    return this.repository.createQueryBuilder('user')
      .where('user.tutorId = :tutorId', { tutorId })
      .getOne();
  }

  /**
   * Finds the maximum tutor ID from all users.
   *
   * @returns The maximum tutor ID if users exist, or null if no users exist
   */
  async findMaxTutorId(): Promise<number | null> {
    const result = await this.repository.createQueryBuilder('user')
      .select('MAX(user.tutorId)', 'maxId')
      .getRawOne();
    
    return result ? result.maxId : null;
  }

  /**
   * Finds a user by their tutor ID and role type.
   *
   * @param tutorId The tutor ID of the user to retrieve
   * @param roleType The role type to match
   * @returns The user if found, or null if not found
   */
  async findByTutorIdAndRoleRoleType(tutorId: number, roleType: RoleType): Promise<User | null> {
    return this.repository.createQueryBuilder('user')
      .where('user.tutorId = :tutorId', { tutorId })
      .andWhere('user.role.roleType = :roleType', { roleType })
      .getOne();
  }

  /**
   * Saves a user entity to the database.
   *
   * @param user The user entity to save
   * @returns The saved user entity
   */
  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  /**
   * Finds a user by their ID.
   *
   * @param id The ID of the user to retrieve
   * @returns The user if found, or null if not found
   */
  async findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  /**
   * Finds all users.
   *
   * @returns An array of all users
   */
  async findAll(): Promise<User[]> {
    return this.repository.find();
  }
}