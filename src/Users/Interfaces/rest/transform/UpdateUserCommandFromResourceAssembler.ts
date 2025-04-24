import { UpdateUserCommand } from '../../../Domain/Model/Command/UpdateUserCommand';
import { UpdateUserResource } from '../resources/UpdateUserResource';

/**
 * Converts an UpdateUserResource to an UpdateUserCommand.
 *
 * This class extracts the necessary information from the provided UpdateUserResource and creates a new UpdateUserCommand object,
 * associating it with the given userId.
 */
export class UpdateUserCommandFromResourceAssembler {
  /**
   * Converts an UpdateUserResource to an UpdateUserCommand.
   *
   * @param id the ID of the user to update
   * @param resource the UpdateUserResource containing the updated data
   * @return an UpdateUserCommand populated with the data from the resource
   */
  public static toCommandFromResource(id: number, resource: UpdateUserResource): UpdateUserCommand {
    return new UpdateUserCommand(
      id,
      resource.avatarUrl,
      resource.gender,
      resource.semester
    );
  }
}