/**
 * Query to retrieve a user by their ID.
 */
export class GetUserByIdQuery {
  /**
   * The ID of the user to retrieve
   */
  readonly userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}