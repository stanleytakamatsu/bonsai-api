import { HttpNotFoundError } from "../../../../../Core/HttpServer/Type/Error/HttpNotFoundError";

class RestaurantNotFoundError extends HttpNotFoundError {
  public readonly name = "RestaurantNotFoundError";

  public constructor() {
    super("The restaurant not found.");
  }
}

export { RestaurantNotFoundError };
