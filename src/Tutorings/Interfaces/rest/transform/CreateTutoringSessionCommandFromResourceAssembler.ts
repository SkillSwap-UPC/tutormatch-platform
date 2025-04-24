import { CreateTutoringSessionCommand } from '../../../Domain/Model/Command/CreateTutoringSessionCommand';
import { CreateTutoringSessionResource } from '../resources/CreateTutoringSessionResource';

/**
 * Assembles a command for creating a tutoring session from the provided resource.
 */
export class CreateTutoringSessionCommandFromResourceAssembler {
  /**
   * Converts a CreateTutoringSessionResource into a CreateTutoringSessionCommand.
   *
   * @param resource The resource containing the details for the tutoring session
   * @returns A command that contains the data needed to create a tutoring session
   */
  static toCommandFromResource(resource: CreateTutoringSessionResource): CreateTutoringSessionCommand {
    return new CreateTutoringSessionCommand(
      resource.title,
      resource.description,
      resource.price,
      resource.times,
      resource.image,
      resource.whatTheyWillLearn,
      resource.tutorId,
      resource.courseId,
      resource.course
    );
  }
}