export class AuthNotConfiguredError extends Error {
  constructor(message = "Authentication is not configured.") {
    super(message);
    this.name = "AuthNotConfiguredError";
  }
}
