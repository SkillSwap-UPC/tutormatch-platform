import { TutoringSessionResource } from '../resources/TutoringSessionResource';
import { TutoringSession } from '../../../Domain/Model/Aggregate/TutoringSession.entity';

/**
 * Assembles a resource representation of a tutoring session from the provided entity.
 */
export class TutoringSessionResourceFromEntityAssembler {
  /**
   * Converts a TutoringSession entity into a TutoringSessionResource.
   *
   * @param entity The entity representing the tutoring session
   * @returns A resource representation of the tutoring session
   */
  static toResourceFromEntity(entity: TutoringSession): TutoringSessionResource {
    return new TutoringSessionResource(
      entity.getId(),
      entity.getTitle(),
      entity.getDescription(),
      entity.getPrice(),
      entity.getTimes(),
      entity.getImage(),
      entity.getWhatTheyWillLearn(),
      entity.getTutorId(),
      entity.getCourse().getId()
    );
  }
}