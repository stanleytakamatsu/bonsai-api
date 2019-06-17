import { UnknownUseCaseError } from "../../../../../Core/Error/UseCase/UnknownUseCaseError";

class AddBusinessHourGenericError extends UnknownUseCaseError {
  public readonly name = "AddBusinessHourGenericError";

  public constructor(error: Error) {
    super("An error occurred while adding the business hour.", error);
  }
}

export { AddBusinessHourGenericError };
