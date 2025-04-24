import { User } from '../../../Domain/Model/Aggregates/User.entity';
import { UserResource } from '../resources/UserResource';

/**
 * Assembles a UserResource from a User entity.
 */
export class UserResourceFromEntityAssembler {
  /**
   * Converts a User entity to a UserResource.
   *
   * @param entity the User entity to convert
   * @return a UserResource populated with data from the user entity
   */
  public static toResourceFromEntity(entity: User): UserResource {
    return new UserResource(
      entity.id,
      entity.fullName,
      entity.emailAddress,
      entity.passwordValue,
      entity.avatarUrl,
      entity.genderValue,
      entity.semesterValue,
      entity.roleType,
      entity.getTutorId()
    );
  }
}