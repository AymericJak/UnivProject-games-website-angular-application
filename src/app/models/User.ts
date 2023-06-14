/**
 * User model.
 */
export interface User {

  /**
   * User id.
   */
  id: number;

  /**
   * User login.
   */
  login: string;

  /**
   * User email.
   */
  email: string;

  /**
   * Verification date of user email.
   */
  email_verified_at: Date;

  /**
   * Validation of user account.
   */
  valid: boolean;

  /**
   * User firstname.
   */
  firstname: string;

  /**
   * User lastname.
   */
  lastname: string;

  /**
   * User pseudo.
   */
  pseudo: string;

  /**
   * User avatar.
   */
  avatar: string;

  /**
   * User remember token.
   */
  remember_token: string;

  /**
   * Account date creation.
   */
  created_at: Date;

  /**
   * Account date update.
   */
  updated_at: Date;
}
