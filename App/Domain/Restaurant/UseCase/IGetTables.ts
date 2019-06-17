import { Table } from "../Entity/Table";
import { IGetTablesQuery } from "../Type/Query/UseCase/IGetTablesQuery";

interface IGetTables {
  execute(query: IGetTablesQuery): Promise<Table[]>;
}

const IGetTables = Symbol.for("IGetTables");

export { IGetTables };
