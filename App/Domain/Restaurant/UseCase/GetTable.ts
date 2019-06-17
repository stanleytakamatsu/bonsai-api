import { ILogger } from "../../../Core/Logger/ILogger";
import { Table } from "../Entity/Table";
import { ITableFinderService } from "../Service/ITableFinderService";
import { TableNotFoundError as TableNotFoundServiceError } from "../Type/Error/Service/TableNotFoundError";
import { GetRestaurantGenericError } from "../Type/Error/UseCase/GetRestaurantGenericError";
import { TableNotFoundError } from "../Type/Error/UseCase/TableNotFoundError";
import { FindTableByGuidQuery } from "../Type/Query/Service/FindTableByGuidQuery";
import { IGetTableQuery } from "../Type/Query/UseCase/IGetTableQuery";
import { IGetTable } from "./IGetTable";

class GetTable implements IGetTable {
  public constructor(
    private readonly findService: ITableFinderService,
    private readonly logger: ILogger
  ) {}

  public async execute(query: IGetTableQuery): Promise<Table> {
    try {
      const serviceQuery = FindTableByGuidQuery.create(query.Guid, query.Restaurant);

      return await this.findService.findByGuid(serviceQuery);
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

export { GetTable };
