import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpStatus, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TutoringSessionCommandService } from '../../Domain/Services/TutoringSessionCommandService';
import { TutoringSessionQueryService } from '../../Domain/Services/TutoringSessionQueryService';
import { CreateTutoringSessionResource } from './resources/CreateTutoringSessionResource';
import { TutoringSessionResource } from './resources/TutoringSessionResource';
import { UpdateTutoringSessionResource } from './resources/UpdateTutoringSessionResource';
import { CreateTutoringSessionCommandFromResourceAssembler } from './transform/CreateTutoringSessionCommandFromResourceAssembler';
import { TutoringSessionResourceFromEntityAssembler } from './transform/TutoringSessionResourceFromEntityAssembler';
import { UpdateTutoringSessionCommandFromResourceAssembler } from './transform/UpdateTutoringSessionCommandFromResourceAssembler';
import { GetAllTutoringsByTutorId } from '../../Domain/Model/Queries/GetAllTutoringsByTutorId';
import { GetAllTutoringsQuery } from '../../Domain/Model/Queries/GetAllTutoringsQuery';
import { GetTutoringByCourseId } from '../../Domain/Model/Queries/GetTutoringByCourseId';
import { GetTutoringById } from '../../Domain/Model/Queries/GetTutoringById';
import { DeleteTutoringCommand } from '../../Domain/Model/Command/DeleteTutoringCommand';

/**
 * REST controller for managing tutoring sessions.
 */
@ApiTags('Tutorings')
@Controller('api/v1')
export class TutoringSessionController {
  constructor(
    @Inject('TutoringSessionCommandService')
    private readonly tutoringSessionCommandService: TutoringSessionCommandService,
    @Inject('TutoringSessionQueryService')
    private readonly tutoringSessionQueryService: TutoringSessionQueryService
  ) {}

  /**
   * Creates a new tutoring session with the provided data.
   *
   * @param resource the tutoring session data to be created
   * @returns the created tutoring session resource, or throws an error if creation fails
   */
  @ApiOperation({ summary: 'Create a Tutoring', description: 'Creates a Tutoring with the provided data' })
  @ApiResponse({ status: 201, description: 'Tutoring created', type: TutoringSessionResource })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    description: 'Tutoring data',
    required: true,
    type: CreateTutoringSessionResource,
    examples: {
      example1: {
        value: {
          title: 'string',
          description: 'string',
          price: 0,
          times: [
            { dayOfWeek: 0, availableHours: [] },
            { dayOfWeek: 1, availableHours: [] },
            { dayOfWeek: 2, availableHours: [] },
            { dayOfWeek: 3, availableHours: [] },
            { dayOfWeek: 4, availableHours: [] },
            { dayOfWeek: 5, availableHours: [] },
            { dayOfWeek: 6, availableHours: [] }
          ],
          image: 'string',
          whatTheyWillLearn: 'string',
          tutorId: 0,
          courseId: 0
        }
      }
    }
  })
  @Post('tutorings')
  async createTutoring(@Body() resource: CreateTutoringSessionResource): Promise<TutoringSessionResource> {
    const createTutoringCommand = CreateTutoringSessionCommandFromResourceAssembler.toCommandFromResource(resource);
    const tutoring = await this.tutoringSessionCommandService.handle(createTutoringCommand);

    if (!tutoring) {
      throw new BadRequestException('Failed to create tutoring session');
    }

    return TutoringSessionResourceFromEntityAssembler.toResourceFromEntity(tutoring);
  }

  /**
   * Retrieves all tutoring sessions for a specific tutor.
   *
   * @param tutorId the ID of the tutor
   * @returns a list of tutoring session resources
   */
  @ApiOperation({ summary: 'Get Tutoring by Tutor ID', description: 'Retrieves all tutoring sessions for a specific tutor' })
  @ApiParam({ name: 'tutorId', description: 'The ID of the tutor', required: true })
  @ApiResponse({ status: 200, description: 'Tutoring sessions retrieved', type: [TutoringSessionResource] })
  @Get('tutor/:tutorId/tutorings')
  async getTutoringByTutorId(@Param('tutorId') tutorId: number): Promise<TutoringSessionResource[]> {
    const getTutoringByTutorIdQuery = new GetAllTutoringsByTutorId(tutorId);
    const tutorings = await this.tutoringSessionQueryService.handle(getTutoringByTutorIdQuery);
    return tutorings.map(TutoringSessionResourceFromEntityAssembler.toResourceFromEntity);
  }

  /**
   * Retrieves tutoring sessions based on optional filters.
   *
   * @param tutorId optional filter by tutor ID
   * @param courseId optional filter by course ID
   * @returns a list of tutoring session resources
   */
  @ApiOperation({ summary: 'Get Tutorings', description: 'Retrieves tutoring sessions with optional filters' })
  @ApiQuery({ name: 'tutorId', description: 'Filter by tutor ID', required: false })
  @ApiQuery({ name: 'courseId', description: 'Filter by course ID', required: false })
  @ApiResponse({ status: 200, description: 'Tutoring sessions retrieved', type: [TutoringSessionResource] })
  @Get('tutorings')
  async getTutorings(
    @Query('tutorId') tutorId?: number,
    @Query('courseId') courseId?: number
  ): Promise<TutoringSessionResource[]> {
    let tutorings;

    if (tutorId) {
      const getTutoringByTutorIdQuery = new GetAllTutoringsByTutorId(tutorId);
      tutorings = await this.tutoringSessionQueryService.handle(getTutoringByTutorIdQuery);
    } else if (courseId) {
      const getTutoringByCourseIdQuery = new GetTutoringByCourseId(courseId);
      const tutoring = await this.tutoringSessionQueryService.handle(getTutoringByCourseIdQuery);
      tutorings = tutoring ? [tutoring] : [];
    } else {
      const getAllTutoringsQuery = new GetAllTutoringsQuery();
      tutorings = await this.tutoringSessionQueryService.handle(getAllTutoringsQuery);
    }

    return tutorings.map(TutoringSessionResourceFromEntityAssembler.toResourceFromEntity);
  }

  /**
   * Retrieves a tutoring session by its ID.
   *
   * @param id the ID of the tutoring session
   * @returns the tutoring session resource
  /**
   * Retrieves a tutoring session by its ID.
   *
   * @param id the ID of the tutoring session
   * @returns the tutoring session resource or throws a 404 exception if not found
   */
  @ApiOperation({ summary: 'Get Tutoring by ID', description: 'Retrieves a specific tutoring session by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the tutoring session', required: true })
  @ApiResponse({ status: 200, description: 'Tutoring session retrieved', type: TutoringSessionResource })
  @ApiResponse({ status: 404, description: 'Tutoring session not found' })
  @Get('tutorings/:id')
  async getTutoringById(@Param('id') id: number): Promise<TutoringSessionResource> {
    const getTutoringByIdQuery = new GetTutoringById(id);
    const tutoring = await this.tutoringSessionQueryService.handle(getTutoringByIdQuery);
    
    if (!tutoring) {
      throw new NotFoundException(`Tutoring session with id ${id} not found`);
    }
    
    // Handle case where tutoring is an array
    if (Array.isArray(tutoring)) {
      if (tutoring.length === 0) {
        throw new NotFoundException(`Tutoring session with id ${id} not found`);
      }
      return TutoringSessionResourceFromEntityAssembler.toResourceFromEntity(tutoring[0]);
    }
    
    return TutoringSessionResourceFromEntityAssembler.toResourceFromEntity(tutoring);
  }
  /**
   * Updates a tutoring session.
   *
   * @param tutoringId the ID of the tutoring session to update
   * @param updateTutoringResource the updated data
   * @returns the updated tutoring session resource
   */
  @ApiOperation({ summary: 'Update Tutoring', description: 'Updates a tutoring session with new data' })
  @ApiParam({ name: 'tutoringId', description: 'The ID of the tutoring session to update', required: true })
  @ApiBody({ description: 'Updated tutoring data', required: true, type: UpdateTutoringSessionResource })
  @ApiResponse({ status: 200, description: 'Tutoring session updated', type: TutoringSessionResource })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Patch('tutorings/:tutoringId')
  async updateTutoring(
    @Param('tutoringId') tutoringId: number,
    @Body() updateTutoringResource: UpdateTutoringSessionResource
  ): Promise<TutoringSessionResource> {
    const updateTutoringCommand = UpdateTutoringSessionCommandFromResourceAssembler.toCommand(
      tutoringId,
      updateTutoringResource
    );
    const updatedTutoring = await this.tutoringSessionCommandService.handle(updateTutoringCommand);

    if (!updatedTutoring) {
      throw new BadRequestException('Failed to update tutoring session');
    }

    return TutoringSessionResourceFromEntityAssembler.toResourceFromEntity(updatedTutoring);
  }

  /**
   * Deletes a tutoring session with the provided ID.
   *
   * @param tutoringId the ID of the tutoring session to delete
   * @returns a message confirming the deletion
   */
  @ApiOperation({ summary: 'Delete Tutoring', description: 'Deletes a tutoring session by ID' })
  @ApiParam({ name: 'tutoringId', description: 'The ID of the tutoring session to delete', required: true })
  @ApiResponse({ status: 200, description: 'Tutoring successfully deleted' })
  @Delete('tutorings/:tutoringId')
  async deleteTutoring(@Param('tutoringId') tutoringId: number): Promise<{ message: string }> {
    const deleteTutoringCommand = new DeleteTutoringCommand(tutoringId);
    await this.tutoringSessionCommandService.handle(deleteTutoringCommand);
    return { message: 'Tutoring with given id successfully deleted' };
  }
}