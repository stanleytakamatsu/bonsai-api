import { UnknownUseCaseError } from "../../../../../Core/Error/UseCase/UnknownUseCaseError";

class GetBookingsGenericError extends UnknownUseCaseError {
  public readonly name = "GetBookingsGenericError";

  public constructor(error: Error) {
    super("An error occurred while trying retrieve the bookings.", error);
  }
}

export { GetBookingsGenericError };
