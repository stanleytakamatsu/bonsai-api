import { HttpNotFoundError } from "../../../../../Core/HttpServer/Type/Error/HttpNotFoundError";

class TableNotFoundError extends HttpNotFoundError {
  public readonly name = "TableNotFoundError";

  public constructor() {
    super("The restaurant table not found.");
  }
}

export { TableNotFoundError };
