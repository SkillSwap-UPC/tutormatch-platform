import { UpdateTutoringCommand } from '../../../Domain/Model/Command/UpdateTutoringCommand';
import { UpdateTutoringSessionResource } from '../resources/UpdateTutoringSessionResource';

/**
 * Assembles an UpdateTutoringCommand from a resource.
 */
export class UpdateTutoringSessionCommandFromResourceAssembler {
  /**
   * Converts an UpdateTutoringSessionResource into an UpdateTutoringCommand.
   *
   * @param tutoringSessionId The ID of the tutoring session to update
   * @param resource The resource with update data
   * @returns A command with the data needed to update a tutoring session
   */
  static toCommand(tutoringSessionId: number, resource: UpdateTutoringSessionResource): UpdateTutoringCommand {
    return new UpdateTutoringCommand(
      tutoringSessionId,
      resource.description, 
      resource.price, 
      resource.times, 
      resource.image, 
      resource.whatTheyWillLearn
    );
  }
}