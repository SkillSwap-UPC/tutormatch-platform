import { DailySchedule } from '../Entities/DailySchedule.entity';
import { IsNotEmpty, IsNumber, Min, IsString, IsArray, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Command to update a tutoring session
 */
export class UpdateTutoringCommand {
  /**
   * The tutoring session id.
   * Cannot be null or less than 1
   */
  @IsNumber()
  @Min(1, { message: 'Tutoring session id cannot be less than 1' })
  readonly tutoringSessionId: number;

  /**
   * The tutoring session description.
   * Cannot be null or blank
   */
  @IsNotEmpty({ message: 'Description cannot be null or empty' })
  @IsString()
  readonly description: string;

  /**
   * The tutoring session price.
   * Cannot be null or negative
   * Must be greater than 0
   * Must be a valid number
   */
  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  readonly price: number;

  /**
   * The tutoring session times.
   * Cannot be null
   */
  @IsArray()
  @ArrayNotEmpty({ message: 'Times cannot be null or empty' })
  @ValidateNested({ each: true })
  @Type(() => DailySchedule)
  readonly times: DailySchedule[];

  /**
   * The tutoring session image.
   * Cannot be null or blank
   */
  @IsNotEmpty({ message: 'Image cannot be null or empty' })
  @IsString()
  readonly image: string;

  /**
   * What they will learn in the tutoring session.
   */
  @IsString()
  readonly whatTheyWillLearn: string;

  /**
   * Constructor
   * @param tutoringSessionId the tutoring session id
   * @param description the tutoring session description
   * @param price the tutoring session price
   * @param times the tutoring session times
   * @param image the tutoring session image
   * @param whatTheyWillLearn what they will learn in the tutoring session
   * @throws Error if any validation fails
   */
  constructor(
    tutoringSessionId: number,
    description: string,
    price: number,
    times: DailySchedule[],
    image: string,
    whatTheyWillLearn: string
  ) {
    this.tutoringSessionId = tutoringSessionId;
    this.description = description;
    this.price = price;
    this.times = times;
    this.image = image;
    this.whatTheyWillLearn = whatTheyWillLearn;

    // Validation logic (alternatively, you can rely on class-validator)
    if (tutoringSessionId === null || tutoringSessionId < 1) {
      throw new Error("Tutoring session id cannot be null or less than 1");
    }
    if (!description || description.trim() === '') {
      throw new Error("Description cannot be null or empty");
    }
    if (price === null || price < 0) {
      throw new Error("Price cannot be null or negative");
    }
    if (!times) {
      throw new Error("Times cannot be null");
    }
    if (!image || image.trim() === '') {
      throw new Error("Image cannot be null or empty");
    }
  }
}