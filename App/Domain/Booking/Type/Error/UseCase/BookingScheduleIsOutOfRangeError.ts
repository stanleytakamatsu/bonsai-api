import { HttpForbiddenError } from "../../../../../Core/HttpServer/Type/Error/HttpForbiddenError";

class BookingScheduleIsOutOfRangeError extends HttpForbiddenError {
  public readonly name = "BookingScheduleIsOutOfRangeError";

  public constructor() {
    super(`The booking time is out of range.`);
  }
}

export { BookingScheduleIsOutOfRangeError };
