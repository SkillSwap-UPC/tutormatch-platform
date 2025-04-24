import { CreateUserCommand } from '../../../Domain/Model/Command/CreateUserCommand';
import { CreateUserResource } from '../resources/CreateUserResource';

/**
 * Assembles a CreateUserCommand from a CreateUserResource.
 */
export class CreateUserCommandFromResourceAssembler {
  /**
   * Converts a CreateUserResource to a CreateUserCommand.
   *
   * @param resource the CreateUserResource containing user data
   * @return a CreateUserCommand populated with the data from the resource
   */
  public static toCommandFromResource(resource: CreateUserResource): CreateUserCommand {
    return new CreateUserCommand(
      resource.firstName,
      resource.lastName,
      resource.email,
      resource.password,
      resource.avatarUrl,
      resource.gender,
      resource.semester,
      resource.roleType
    );
  }
}