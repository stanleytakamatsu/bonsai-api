import { UnknownUseCaseError } from "../../../../../Core/Error/UseCase/UnknownUseCaseError";

class RemoveBookingGenericError extends UnknownUseCaseError {
  public readonly name = "RemoveBookingGenericError";

  public constructor(error: Error) {
    super("An error occurred while trying delete the booking.", error);
  }
}

export { RemoveBookingGenericError };
