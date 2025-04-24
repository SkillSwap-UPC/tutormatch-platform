import { Body, Controller, Get, HttpStatus, Inject, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserCommandService } from '../../Domain/Services/UserCommandService';
import { UserQueryService } from '../../Domain/Services/UserQueryService';
import { CreateUserResource } from './resources/CreateUserResource';
import { UpdateUserResource } from './resources/UpdateUserResource';
import { UserResource } from './resources/UserResource';
import { CreateUserCommandFromResourceAssembler } from './transform/CreateUserCommandFromResourceAssembler';
import { UpdateUserCommandFromResourceAssembler } from './transform/UpdateUserCommandFromResourceAssembler';
import { UserResourceFromEntityAssembler } from './transform/UserResourceFromEntityAssembler';
import { GetUserByRoleQuery } from '../../Domain/Model/Queries/GetUserByRole';
import { GetUserByEmailPasswordQuery } from '../../Domain/Model/Queries/GetUserByEmailPassword';
import { GetTutorByEmailQuery } from '../../Domain/Model/Queries/GetTutorByEmail';
import { GetAllUsersQuery } from '../../Domain/Model/Queries/GetAllUsersQuery';
import { GetUserByIdQuery } from '../../Domain/Model/Queries/GetUserById';
import { GetTutorByIdRoleQuery } from '../../Domain/Model/Queries/GetTutorByIdRole';
import { RoleType } from '../../Domain/Model/ValueObjects/RoleType';
import { EmailAddress } from '../../Domain/Model/ValueObjects/EmailAddress';
import { Password } from '../../Domain/Model/ValueObjects/Password';

/**
 * REST controller for managing users.
 * Provides endpoints for creating, retrieving, and managing user data.
 */
@ApiTags('Users')
@Controller('api/v1')
export class UsersController {
  constructor(
    @Inject('UserCommandService')
    private readonly userCommandService: UserCommandService,
    @Inject('UserQueryService')
    private readonly userQueryService: UserQueryService
  ) {}
  /**
   * Creates a new user with the provided data.
   *
   * @param resource the resource containing user data for creation
   * @returns The created user resource or a bad request response
   */
  @Post('/users')
  @ApiOperation({
    summary: 'Create a User',
    description: 'Creates a user with the provided data'
  })
  @ApiResponse({ status: 201, description: 'User created', type: UserResource })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createUser(@Body() resource: CreateUserResource, @Res() response: Response) {
    const createUserCommand = CreateUserCommandFromResourceAssembler.toCommandFromResource(resource);
    const user = await this.userCommandService.handle(createUserCommand);
    
    if (!user) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
    
    const userResource = UserResourceFromEntityAssembler.toResourceFromEntity(user);
    return response.status(HttpStatus.CREATED).json(userResource);
  }

  /**
   * Retrieves users by their role (e.g., 'TEACHER' or 'STUDENT').
   *
   * @param role the role of the users to retrieve
   * @returns A list of user resources if found, or a not found response
   */
  @Get('/users/role/:role')
  @ApiOperation({
    summary: 'Get Users by Role',
    description: 'Retrieves users by their role (e.g., TEACHER or STUDENT)'
  })
  @ApiResponse({ status: 200, description: 'Users found', type: [UserResource] })
  @ApiResponse({ status: 404, description: 'No users found for the specified role' })
  async getUsersByRole(@Param('role') role: string, @Res() response: Response) {
    try {
      const roleType = role.toLowerCase() as RoleType;
      const getUserByRoleQuery = new GetUserByRoleQuery(roleType);
      const users = await this.userQueryService.handle(getUserByRoleQuery);

      if (!users || users.length === 0) {
        return response.status(HttpStatus.NOT_FOUND).send();
      }

      const userResources = users.map(user => 
        UserResourceFromEntityAssembler.toResourceFromEntity(user)
      );

      return response.status(HttpStatus.OK).json(userResources);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  /**
   * Retrieves users based on various query parameters.
   *
   * @param email the email of the user to retrieve
   * @param password the password of the user to retrieve
   * @param tutorId the tutor ID to search for
   * @param roleType the role type to match
   * @returns The user resource or a list of user resources if found, or a not found response
   */
  @Get('/users')
  @ApiOperation({
    summary: 'Get Users',
    description: 'Retrieves users based on various query parameters'
  })
  @ApiResponse({ status: 200, description: 'User(s) found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUsers(
    @Res() response: Response,
    @Query('email') email?: string,
    @Query('password') password?: string,
    @Query('tutorId') tutorId?: number,
    @Query('roleType') roleType?: RoleType
  ) {
    if (email && password) {
      const getUserByEmailPasswordQuery = new GetUserByEmailPasswordQuery(
        new EmailAddress(email), 
        new Password(password)
      );
      const user = await this.userQueryService.handle(getUserByEmailPasswordQuery);
      
      if (!user) {
        return response.status(HttpStatus.NOT_FOUND).send();
      }
      
      const userResource = UserResourceFromEntityAssembler.toResourceFromEntity(user);
      return response.status(HttpStatus.OK).json(userResource);
    } 
    else if (email) {
      const getTutorByEmailQuery = new GetTutorByEmailQuery(new EmailAddress(email));
      const tutor = await this.userQueryService.handle(getTutorByEmailQuery);
      
      if (!tutor) {
        return response.status(HttpStatus.NOT_FOUND).send();
      }
      
      const tutorResource = UserResourceFromEntityAssembler.toResourceFromEntity(tutor);
      return response.status(HttpStatus.OK).json(tutorResource);
    } 
    else if (tutorId && roleType) {
      const getTutorByIdRoleQuery = new GetTutorByIdRoleQuery(tutorId, roleType);
      const tutor = await this.userQueryService.handle(getTutorByIdRoleQuery);
      
      if (!tutor) {
        return response.status(HttpStatus.NOT_FOUND).send();
      }
      
      // Verificar si tutor es un array
      if (Array.isArray(tutor)) {
        if (tutor.length === 0) {
          return response.status(HttpStatus.NOT_FOUND).send();
        }
        // Usar el primer elemento si es un array
        const tutorResource = UserResourceFromEntityAssembler.toResourceFromEntity(tutor[0]);
        return response.status(HttpStatus.OK).json(tutorResource);
      } else {
        // Si no es un array, usarlo directamente
        const tutorResource = UserResourceFromEntityAssembler.toResourceFromEntity(tutor);
        return response.status(HttpStatus.OK).json(tutorResource);
      }
    }
    else if (!email && !password) {
      const getAllUsersQuery = new GetAllUsersQuery();
      const users = await this.userQueryService.handle(getAllUsersQuery);
      
      const userResources = users.map(user => 
        UserResourceFromEntityAssembler.toResourceFromEntity(user)
      );
      
      return response.status(HttpStatus.OK).json(userResources);
    } 
    else {
      return response.status(HttpStatus.BAD_REQUEST)
        .json({ message: "Both email and password are required to search for a specific user." });
    }
  }

  /**
   * Updates a user.
   *
   * @param userId the id of the user to be updated
   * @param updateUserResource the resource containing the data for the user to be updated
   * @returns the updated user resource
   */
  @Patch('/users/:userId')
  @ApiOperation({
    summary: 'Update User',
    description: 'Updates a user\'s attributes'
  })
  @ApiResponse({ status: 200, description: 'User updated', type: UserResource })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateUser(
    @Param('userId') userId: number, 
    @Body() updateUserResource: UpdateUserResource,
    @Res() response: Response
  ) {
    const updateUserCommand = UpdateUserCommandFromResourceAssembler.toCommandFromResource(
      userId, 
      updateUserResource
    );
    
    const updatedUser = await this.userCommandService.handle(updateUserCommand);

    if (!updatedUser) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }

    const userResource = UserResourceFromEntityAssembler.toResourceFromEntity(updatedUser);
    return response.status(HttpStatus.OK).json(userResource);
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param userId the ID of the user to retrieve
   * @returns the user resource if found, or a not found response
   */
  @Get('/users/:userId')
  @ApiOperation({
    summary: 'Get User by ID',
    description: 'Retrieves a user by their ID'
  })
  @ApiResponse({ status: 200, description: 'User found', type: UserResource })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(@Param('userId') userId: number, @Res() response: Response) {
    const getUserByIdQuery = new GetUserByIdQuery(userId);
    const user = await this.userQueryService.handle(getUserByIdQuery);
    
    if (!user) {
      return response.status(HttpStatus.NOT_FOUND).send();
    }
    
    // Handle case where result might be an array
    if (Array.isArray(user)) {
      if (user.length === 0) {
        return response.status(HttpStatus.NOT_FOUND).send();
      }
      // Get the first user if it's an array
      const userResource = UserResourceFromEntityAssembler.toResourceFromEntity(user[0]);
      return response.status(HttpStatus.OK).json(userResource);
    } else {
      const userResource = UserResourceFromEntityAssembler.toResourceFromEntity(user);
      return response.status(HttpStatus.OK).json(userResource);
    }
  }
}