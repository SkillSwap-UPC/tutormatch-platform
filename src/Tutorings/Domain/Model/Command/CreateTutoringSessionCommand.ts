import { Course } from '../Entities/Course.entity';
import { DailySchedule } from '../Entities/DailySchedule.entity';
import { IsNotEmpty, IsNumber, Min, IsString, IsArray, ValidateNested, ArrayNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Command for creating a new tutoring session.
 * Contains all necessary information for setting up a tutoring session,
 * including title, description,
 * price, available times, image, tutor ID, and course ID.
 */
export class CreateTutoringSessionCommand {
  /**
   * The title of the tutoring session.
   */
  @IsNotEmpty({ message: 'Title cannot be null or empty' })
  @IsString()
  readonly title: string;

  /**
   * The description of the tutoring session.
   */
  @IsNotEmpty({ message: 'Description cannot be null or empty' })
  @IsString()
  readonly description: string;

  /**
   * The price of the tutoring session.
   */
  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  readonly price: number;

  /**
   * A list of DailySchedule objects representing available
   * times for each day of the week.
   * Each DailySchedule specifies the day and available hours.
   */
  @IsArray()
  @ArrayNotEmpty({ message: 'Times cannot be null or empty' })
  @ValidateNested({ each: true })
  @Type(() => DailySchedule)
  readonly times: DailySchedule[];

  /**
   * The URL or path to an image associated with the tutoring session.
   */
  @IsNotEmpty({ message: 'Image cannot be null or empty' })
  @IsString()
  readonly image: string;

  /**
   * The description of what students will learn in this tutoring session.
   */
  @IsString()
  readonly whatTheyWillLearn: string;

  /**
   * The ID of the tutor who offers this tutoring session.
   */
  @IsNumber()
  @Min(1, { message: 'Tutor ID cannot be less than 1' })
  readonly tutorId: number;

  /**
   * The ID of the course associated with this tutoring session.
   */
  @IsNumber()
  @Min(1, { message: 'Course ID cannot be less than 1' })
  readonly courseId: number;

  /**
   * The course associated with this tutoring session.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => Course)
  readonly course?: Course;

  /**
   * Constructor
   * @param title The title of the tutoring session
   * @param description The description of the tutoring session
   * @param price The price of the tutoring session
   * @param times A list of DailySchedule objects representing available times
   * @param image The URL or path to an image
   * @param whatTheyWillLearn What students will learn
   * @param tutorId The ID of the tutor
   * @param courseId The ID of the course
   * @param course The course object
   */
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