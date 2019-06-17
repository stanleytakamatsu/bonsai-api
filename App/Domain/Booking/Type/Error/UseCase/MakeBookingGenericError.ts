import { UnknownUseCaseError } from "../../../../../Core/Error/UseCase/UnknownUseCaseError";

class MakeBookingGenericError extends UnknownUseCaseError {
  public readonly name = "MakeBookingGenericError";

  public constructor(error: Error) {
    super("An error occurred while trying make the booking.", error);
  }
}

export { MakeBookingGenericError };
