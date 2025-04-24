import { Course } from 'src/Tutorings/Domain/Model/Entities/Course.entity';
import { DailySchedule } from 'src/Tutorings/Domain/Model/Entities/DailySchedule.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Represents the resource for creating a new tutoring session.
 */
export class CreateTutoringSessionResource {
  @ApiProperty({ description: 'The title of the tutoring session' })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'A brief description of the tutoring session' })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The price for the tutoring session' })
  @IsNumber()
  @Min(0, { message: 'Price must be non-negative' })
  price: number;

  @ApiProperty({ description: 'A list of available time slots for the tutoring session', type: [DailySchedule] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DailySchedule)
  times: DailySchedule[];

  @ApiProperty({ description: 'A URL or path to the image associated with the tutoring session' })
  @IsString()
  image: string;

  @ApiProperty({ description: 'A description of what students will learn in the tutoring session' })
  @IsString()
  whatTheyWillLearn: string;

  @ApiProperty({ description: 'The ID of the tutor offering the session' })
  @IsNumber()
  @Min(1, { message: 'Tutor ID must be positive' })
  tutorId: number;

  @ApiProperty({ description: 'The ID of the course related to the tutoring session' })
  @IsNumber()
  @Min(1, { message: 'Course ID must be positive' })
  courseId: number;

  @ApiProperty({ description: 'The course associated with the tutoring session', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => Course)
  course?: Course;

  constructor(
    title: string,
    description: string,
    price: number,
    times: DailySchedule[],
    image: string,
    whatTheyWillLearn: string,
    tutorId: number,
    courseId: number,
    course?: Course
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.times = times;
    this.image = image;
    this.whatTheyWillLearn = whatTheyWillLearn;
    this.tutorId = tutorId;
    this.courseId = courseId;
    this.course = course;
  }
}