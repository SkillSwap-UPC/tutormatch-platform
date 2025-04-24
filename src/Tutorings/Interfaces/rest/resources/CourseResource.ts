import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents the resource for a course.
 */
export class CourseResource {
  @ApiProperty({ description: 'The unique identifier of the course' })
  id: number;

  @ApiProperty({ description: 'The title of the course' })
  name: string;

  @ApiProperty({ description: 'A brief description of the course' })
  description: string;

  @ApiProperty({ description: 'The cycle of the course' })
  cycle: number;

  constructor(
    id: number,
    name: string,
    description: string,
    cycle: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cycle = cycle;
  }
}