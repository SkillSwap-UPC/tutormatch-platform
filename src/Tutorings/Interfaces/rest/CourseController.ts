import { Controller, Get, Query, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CourseQueryService } from '../../Domain/Services/CourseQueryService';
import { CourseResource } from './resources/CourseResource';
import { CourseResourceFromEntityAssembler } from './transform/CourseResourceFromEntityAssembler';
import { GetAllCoursesQuery } from '../../Domain/Model/Queries/GetAllCoursesQuery';
import { GetCourseByCycle } from '../../Domain/Model/Queries/GetCourseByCycle';

/**
 * REST controller for managing tutoring sessions associated with courses.
 * Handles requests for retrieving tutoring sessions by semester.
 */
@ApiTags('Courses')
@Controller('api/v1')
export class CourseController {
  constructor(
    @Inject('CourseQueryService')
    private readonly courseQueryService: CourseQueryService
  ) {}

  /**
   * Retrieves all available courses, optionally filtered by cycle.
   *
   * @param cycle optional filter by cycle
   * @returns A list of course resources
   */
  @ApiOperation({ summary: 'Get All Courses', description: 'Retrieves all courses, optionally filtered by cycle' })
  @ApiQuery({ name: 'cycle', description: 'Filter by cycle number', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Courses retrieved successfully', type: [CourseResource] })
  @Get('courses')
  async getAllCourses(@Query('cycle') cycle?: number): Promise<CourseResource[]> {
    let courses;

    if (cycle !== undefined) {
      const getCoursesByCycleQuery = new GetCourseByCycle(cycle);
      courses = await this.courseQueryService.handle(getCoursesByCycleQuery);
    } else {
      const getAllCoursesQuery = new GetAllCoursesQuery();
      courses = await this.courseQueryService.handle(getAllCoursesQuery);
    }

    return courses.map(CourseResourceFromEntityAssembler.toResourceFromEntity);
  }
}