import { RecordNotFoundError } from "../../../Core/Error/Repository/RecordNotFoundError";
import { GenericError } from "../../../Core/Error/Service/GenericError";
import { Table } from "../Entity/Table";
import { ITableRepository } from "../Repository/ITableRepository";
import { TableNotFoundError } from "../Type/Error/Service/TableNotFoundError";
import { FindTableByGuidQuery } from "../Type/Query/Repository/FindTableByGuidQuery";
import { GetTablesQuery } from "../Type/Query/Repository/GetTablesQuery";
import { IFindTableByGuidQuery } from "../Type/Query/Service/IFindTableByGuidQuery";
import { IGetTablesQuery } from "../Type/Query/Service/IGetTablesQuery";
import { ITableFinderService } from "./ITableFinderService";

class TableFinderService implements ITableFinderService {
  public constructor(private readonly repository: ITableRepository) {}

  public async findByGuid(query: IFindTableByGuidQuery): Promise<Table> {
    try {
      const repositoryQuery = FindTableByGuidQuery.create(query.Guid, query.Restaurant);

      return await this.repository.findByGuid(repositoryQuery);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  public async findAll(query: IGetTablesQuery): Promise<Table[]> {
    try {
      const repositoryQuery = GetTablesQuery.create(query.Restaurant);

      return await this.repository.findAll(repositoryQuery);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case RecordNotFoundError:
        throw new TableNotFoundError(error.message);
      default:
        throw new GenericError(error.message, error);
    }
  }
}

export { TableFinderService };
