import { UnknownUseCaseError } from "../../../../../Core/Error/UseCase/UnknownUseCaseError";

class GetRestaurantsGenericError extends UnknownUseCaseError {
  public readonly name = "GetRestaurantsGenericError";

  public constructor(error: Error) {
    super("An error occurred when trying to get list of restaurants.", error);
  }
}

export { GetRestaurantsGenericError };
