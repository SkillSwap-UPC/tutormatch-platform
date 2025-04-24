import { RoleType } from "../ValueObjects/RoleType";

/**
 * Query to retrieve users by their role type.
 */
export class GetUserByRoleQuery {
  /**
   * The role type to filter users by
   */
  readonly roleType: RoleType;

  constructor(roleType: RoleType) {
    this.roleType = roleType;
  }
}