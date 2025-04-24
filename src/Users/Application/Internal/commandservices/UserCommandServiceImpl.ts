import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../Domain/Model/Aggregates/User.entity';
import { CreateUserCommand } from '../../../Domain/Model/Command/CreateUserCommand';
import { UpdateUserCommand } from '../../../Domain/Model/Command/UpdateUserCommand';
import { UserCommandService } from '../../../Domain/Services/UserCommandService';
import { EmailAddress } from '../../../Domain/Model/ValueObjects/EmailAddress';
import { Password } from '../../../Domain/Model/ValueObjects/Password';
import { RoleType } from '../../../Domain/Model/ValueObjects/RoleType';

/**
 * Service implementation for handling user-related commands.
 * Provides the implementation for creating and
 * managing users within the application.
 */
@Injectable()
export class UserCommandServiceImpl implements UserCommandService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Implementation to handle different command types.
   * This is a workaround for TypeScript's lack of method overloading.
   */
  async handle(command: CreateUserCommand): Promise<User | null>;
  async handle(command: UpdateUserCommand): Promise<User | null>;
  async handle(command: any): Promise<User | null> {
    if (command instanceof CreateUserCommand) {
      return this.handleCreateUser(command);
    } else if (command instanceof UpdateUserCommand) {
      return this.handleUpdateUser(command);
    }
    return null;
  }

  /**
   * Handles the creation of a new user based on the provided CreateUserCommand.
   * Validates that the email in the command is unique
   * before proceeding with user creation.
   *
   * @param command the command containing the user's details needed for creation.
   * @return the created user if successful, or null if not.
   * @throws Error if a user with the specified email already exists.
   */
    private async handleCreateUser(command: CreateUserCommand): Promise<User | null> {
      try {
        // Usar el nombre de la columna generada por TypeORM para objetos embebidos
        const existingUser = await this.userRepository.createQueryBuilder('user')
          .where('user.email_address = :email', { email: command.email })
          .getOne();
        
        if (existingUser) {
          console.error(`User with email ${command.email} already exists`);
          return null;
        }
        
        const user = User.fromCommand(command);
        
        if (command.roleType === RoleType.TEACHER) {
          const maxResult = await this.userRepository
            .createQueryBuilder('user')
            .select('COALESCE(MAX(user.tutorId), 0)', 'maxId')
            .getRawOne();
          
          const nextTutorId = (maxResult && maxResult.maxId ? Number(maxResult.maxId) : 0) + 1;
          user.setTutorId(nextTutorId);
        }
        
        return await this.userRepository.save(user);
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    }

  /**
   * Handles updating user attributes (avatar, gender, and semester) based on the provided
   * UpdateUserCommand.
   *
   * @param command the command containing the user's updated attributes.
   * @return the updated user if successful, or null if not.
   * @throws Error if a user with the specified ID does not exist.
   */
  private async handleUpdateUser(command: UpdateUserCommand): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: command.id });
    
    if (!user) {
      throw new Error(`User with id ${command.id} not found`);
    }
    
    user.updateUserAttributes(command);
    await this.userRepository.save(user);
    
    return user;
  }
}