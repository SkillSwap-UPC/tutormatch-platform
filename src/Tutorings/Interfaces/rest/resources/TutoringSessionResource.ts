import { DailySchedule } from 'src/Tutorings/Domain/Model/Entities/DailySchedule.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents the resource for a tutoring session.
 */
export class TutoringSessionResource {
  @ApiProperty({ description: 'The unique identifier of the tutoring session' })
  id: number;

  @ApiProperty({ description: 'The title of the tutoring session' })
  title: string;

  @ApiProperty({ description: 'A brief description of the tutoring session' })
  description: string;

  @ApiProperty({ description: 'The price for the tutoring session' })
  price: number;

  @ApiProperty({ description: 'A list of available time slots for the tutoring session', type: [DailySchedule] })
  times: DailySchedule[];

  @ApiProperty({ description: 'A URL or path to the image associated with the tutoring session' })
  image: string;

  @ApiProperty({ description: 'A description of what students will learn in the tutoring session' })
  whatTheyWillLearn: string;

  @ApiProperty({ description: 'The ID of the tutor offering the session' })
  tutorId: number;

  @ApiProperty({ description: 'The ID of the course related to the tutoring session' })
  courseId: number;

  constructor(
    id: number,
    title: string,
    description: string,
    price: number,
    times: DailySchedule[],
    image: string,
    whatTheyWillLearn: string,
    tutorId: number,
    courseId: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.times = times;
    this.image = image;
    this.whatTheyWillLearn = whatTheyWillLearn;
    this.tutorId = tutorId;
    this.courseId = courseId;
  }
}