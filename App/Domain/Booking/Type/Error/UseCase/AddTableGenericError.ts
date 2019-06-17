import { UnknownUseCaseError } from "../../../../../Core/Error/UseCase/UnknownUseCaseError";

class AddTableGenericError extends UnknownUseCaseError {
  public readonly name = "AddTableGenericError";

  public constructor(error: Error) {
    super("An error occurred while trying create a table.", error);
  }
}

export { AddTableGenericError };
