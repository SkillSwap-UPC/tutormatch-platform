import { RoleType } from "../ValueObjects/RoleType";

/**
 * Query to retrieve a tutor by their ID and role type.
 */
export class GetTutorByIdRoleQuery {
  /**
   * The ID of the tutor to retrieve
   */
  readonly tutorId: number;
  
  /**
   * The role type to match (typically TEACHER)
   */
  readonly roleType: RoleType;

  constructor(tutorId: number, roleType: RoleType) {
    this.tutorId = tutorId;
    this.roleType = roleType;
  }
}