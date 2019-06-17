import { UnknownUseCaseError } from "../../../../../Core/Error/UseCase/UnknownUseCaseError";

class RegisterRestaurantGenericError extends UnknownUseCaseError {
  public readonly name = "RegisterRestaurantGenericError";

  public constructor(error: Error) {
    super("An error occurred while trying to register the restaurant.", error);
  }
}

export { RegisterRestaurantGenericError };
