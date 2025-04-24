import { EmailAddress } from "../ValueObjects/EmailAddress";
import { Password } from "../ValueObjects/Password";

/**
 * Query to retrieve a user by their email address and password.
 * Typically used for authentication purposes.
 */
export class GetUserByEmailPasswordQuery {
  /**
   * The email address of the user to retrieve
   */
  readonly emailAddress: EmailAddress;
  
  /**
   * The password of the user to verify
   */
  readonly password: Password;

  constructor(emailAddress: EmailAddress, password: Password) {
    this.emailAddress = emailAddress;
    this.password = password;
  }
}