import { HttpConflictError } from "../../../../../Core/HttpServer/Type/Error/HttpConflictError";

class RestaurantAlreadyExistsError extends HttpConflictError {
  public readonly name = "RestaurantAlreadyExistsError";

  public constructor() {
    super(`The restaurant already exists.`);
  }
}

export { RestaurantAlreadyExistsError };
