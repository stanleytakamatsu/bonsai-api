import { HttpConflictError } from "../../../../../Core/HttpServer/Type/Error/HttpConflictError";

class BusinessHourAlreadyExistsError extends HttpConflictError {
  public readonly name = "BusinessHourAlreadyExistsError";

  public constructor() {
    super(`The business hour of the restaurant already exists.`);
  }
}

export { BusinessHourAlreadyExistsError };
