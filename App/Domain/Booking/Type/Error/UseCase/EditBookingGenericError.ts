import { UnknownUseCaseError } from "../../../../../Core/Error/UseCase/UnknownUseCaseError";

class EditBookingGenericError extends UnknownUseCaseError {
  public readonly name = "EditBookingGenericError";

  public constructor(error: Error) {
    super("An error occurred while trying update the booking.", error);
  }
}

export { EditBookingGenericError };
