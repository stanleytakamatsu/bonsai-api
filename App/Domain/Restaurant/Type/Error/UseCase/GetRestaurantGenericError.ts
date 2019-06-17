import { UnknownUseCaseError } from "../../../../../Core/Error/UseCase/UnknownUseCaseError";

class GetRestaurantGenericError extends UnknownUseCaseError {
  public readonly name = "GetRestaurantGenericError";

  public constructor(error: Error) {
    super("An error occurred when trying to get the restaurant.", error);
  }
}

export { GetRestaurantGenericError };
