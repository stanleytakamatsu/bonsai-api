import { HttpNotFoundError } from "../../../../../Core/HttpServer/Type/Error/HttpNotFoundError";

class BookingNotFoundError extends HttpNotFoundError {
  public readonly name = "BookingNotFoundError";

  public constructor() {
    super("Booking not found.");
  }
}

export { BookingNotFoundError };
