import { Table } from "../Entity/Table";
import { IGetAvailableTablesQuery } from "../Type/Query/UseCase/IGetAvailableTablesQuery";

interface IGetAvailableTables {
  execute(query: IGetAvailableTablesQuery): Promise<Table[]>;
}

const IGetAvailableTables = Symbol.for("IGetAvailableTables");

export { IGetAvailableTables };
