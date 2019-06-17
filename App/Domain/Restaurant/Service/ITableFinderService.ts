import { Table } from "../Entity/Table";
import { IFindTableByGuidQuery } from "../Type/Query/Service/IFindTableByGuidQuery";
import { IGetTablesQuery } from "../Type/Query/Service/IGetTablesQuery";

interface ITableFinderService {
  findByGuid(query: IFindTableByGuidQuery): Promise<Table>;
  findAll(query: IGetTablesQuery): Promise<Table[]>;
}

const ITableFinderService = Symbol.for("ITableFinderService");

export { ITableFinderService };
