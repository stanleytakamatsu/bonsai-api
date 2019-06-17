import { ConflictRecordError } from "../../../Core/Error/Repository/ConflictRecordError";
import { SaveRecordError } from "../../../Core/Error/Repository/SaveRecordError";
import { GenericError } from "../../../Core/Error/Service/GenericError";
import { ITableRepository } from "../Repository/ITableRepository";
import { CreateTableCommand } from "../Type/Command/Repository/CreateTableCommand";
import { ICreateTableCommand } from "../Type/Command/Service/ICreateTableCommand";
import { TableAlreadyExists } from "../Type/Error/Service/TableAlreadyExists";
import { ITableCreatorService } from "./ITableCreatorService";

class TableCreatorService implements ITableCreatorService {
  public constructor(private readonly repository: ITableRepository) {}

  public async create(command: ICreateTableCommand): Promise<void> {
    try {
      const repositoryCommand = CreateTableCommand.create(command.Table);

      await this.repository.create(repositoryCommand);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case SaveRecordError:
        const saveRecordError = error as SaveRecordError;

        throw new GenericError(error.message, saveRecordError.OriginalError);
      case ConflictRecordError:
        throw new TableAlreadyExists(error.message);
      default:
        throw new GenericError(error.message, error);
    }
  }
}

export { TableCreatorService };
