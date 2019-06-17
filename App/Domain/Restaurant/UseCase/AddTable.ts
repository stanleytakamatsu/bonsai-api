import { ILogger } from "../../../Core/Logger/ILogger";
import { Table } from "../Entity/Table";
import { ITableCreatorService } from "../Service/ITableCreatorService";
import { CreateTableCommand } from "../Type/Command/Service/CreateTableCommand";
import { IAddTableCommand } from "../Type/Command/UseCase/IAddTableCommand";
import { TableAlreadyExists as TableAlreadyExistsServiceError } from "../Type/Error/Service/TableAlreadyExists";
import { AddTableGenericError } from "../Type/Error/UseCase/AddTableGenericError";
import { TableAlreadyExists } from "../Type/Error/UseCase/TableAlreadyExists";
import { IAddTable } from "./IAddTable";

class AddTable implements IAddTable {
  public constructor(
    private readonly creatorService: ITableCreatorService,
    private readonly logger: ILogger
  ) {}

  public async execute(command: IAddTableCommand): Promise<void> {
    try {
      const table = Table.create(command.Code, command.Restaurant);

      const createCommand = CreateTableCommand.create(table);

      await this.creatorService.create(createCommand);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error, command.Code);
    }
  }

  private throwSpecificErrorBasedOn(error: Error, code: string): void {
    switch (error.constructor) {
      case TableAlreadyExistsServiceError:
        this.logger.warning(error.message, error);

        throw new TableAlreadyExists(code);
      default:
        this.logger.error(error.message, error);

        throw new AddTableGenericError(error);
    }
  }
}

export { AddTable };
