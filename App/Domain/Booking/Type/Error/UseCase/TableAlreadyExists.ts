import { HttpConflictError } from "../../../../../Core/HttpServer/Type/Error/HttpConflictError";

class TableAlreadyExists extends HttpConflictError {
  public readonly name = "TableAlreadyExists";

  public constructor(code: string) {
    super(`The table with code "${code}" already registered.`);
  }
}

export { TableAlreadyExists };
