import { EmailAddress } from "../ValueObjects/EmailAddress";

/**
 * Query to retrieve a tutor by their email address.
 */
export class GetTutorByEmailQuery {
  /**
   * The email address of the tutor to retrieve
   */
  readonly emailAddress: EmailAddress;

  constructor(emailAddress: EmailAddress) {
    this.emailAddress = emailAddress;
  }
}