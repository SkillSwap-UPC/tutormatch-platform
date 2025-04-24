import { DailySchedule } from 'src/Tutorings/Domain/Model/Entities/DailySchedule.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Resource for updating a tutoring session
 */
export class UpdateTutoringSessionResource {
  @ApiProperty({ description: 'A brief description of the tutoring session' })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The price for the tutoring session' })
  @IsNumber()
  @Min(0, { message: 'Price must be non-negative' })
  price: number;

  @ApiProperty({ description: 'List of available time slots for the tutoring session', type: [DailySchedule] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DailySchedule)
  times: DailySchedule[];

  @ApiProperty({ description: 'URL or path to the image associated with the tutoring session' })
  @IsString()
  image: string;

  @ApiProperty({ description: 'Description of what students will learn in the tutoring session' })
  @IsString()
  whatTheyWillLearn: string;

  constructor(
    description: string,
    price: number,
    times: DailySchedule[],
    image: string,
    whatTheyWillLearn: string
  ) {
    this.description = description;
    this.price = price;
    this.times = times;
    this.image = image;
    this.whatTheyWillLearn = whatTheyWillLearn;
  }
}