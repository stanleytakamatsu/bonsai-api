import { ILogger } from "../../../Core/Logger/ILogger";
import { Table } from "../Entity/Table";
import { ITableFinderService } from "../Service/ITableFinderService";
import { TableNotFoundError as TableNotFoundServiceError } from "../Type/Error/Service/TableNotFoundError";
import { GetRestaurantGenericError } from "../Type/Error/UseCase/GetRestaurantGenericError";
import { TableNotFoundError } from "../Type/Error/UseCase/TableNotFoundError";
import { GetTablesQuery } from "../Type/Query/Service/GetTablesQuery";
import { IGetTablesQuery } from "../Type/Query/UseCase/IGetTablesQuery";
import { IGetTables } from "./IGetTables";

class GetTables implements IGetTables {
  public constructor(
    private readonly findService: ITableFinderService,
    private readonly logger: ILogger
  ) {}

  public async execute(query: IGetTablesQuery): Promise<Table[]> {
    try {
      const serviceQuery = GetTablesQuery.create(query.Restaurant);

      return await this.findService.findAll(serviceQuery);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case TableNotFoundServiceError:
        this.logger.warning(error.message, error);

        throw new TableNotFoundError();
      default:
        this.logger.error(error.message, error);

        throw new GetRestaurantGenericError(error);
    }
  }
}

export { GetTables };
