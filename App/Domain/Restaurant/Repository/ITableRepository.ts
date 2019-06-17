import { ICreateTableCommand } from "../Type/Command/Repository/ICreateTableCommand";
import { IFindTableByGuidQuery } from "../Type/Query/Repository/IFindTableByGuidQuery";
import { Table } from "../Entity/Table";
import { IGetTablesQuery } from "../Type/Query/Repository/IGetTablesQuery";

interface ITableRepository {
  create(command: ICreateTableCommand): Promise<void>;
  findByGuid(query: IFindTableByGuidQuery): Promise<Table>;
  findAll(query: IGetTablesQuery): Promise<Table[]>;
}

const ITableRepository = Symbol.for("ITableRepository");

export { ITableRepository };
