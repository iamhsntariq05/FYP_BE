class GeneralError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {}
class InternalConflict extends GeneralError {}
class NotFound extends GeneralError {}
class InvalidPassword extends GeneralError {}

export { GeneralError, BadRequest, NotFound,InvalidPassword,InternalConflict };
