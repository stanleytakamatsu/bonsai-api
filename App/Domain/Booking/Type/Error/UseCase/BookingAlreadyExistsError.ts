import { HttpConflictError } from "../../../../../Core/HttpServer/Type/Error/HttpConflictError";

class BookingAlreadyExistsError extends HttpConflictError {
  public readonly name = "BusinessHourAlreadyExistsError";

  public constructor() {
    super(`The booking already exists.`);
  }
}

export { BookingAlreadyExistsError };
