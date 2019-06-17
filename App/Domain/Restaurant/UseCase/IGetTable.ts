import { Table } from "../Entity/Table";
import { IGetTableQuery } from "../Type/Query/UseCase/IGetTableQuery";

interface IGetTable {
  execute(query: IGetTableQuery): Promise<Table>;
}

const IGetTable = Symbol.for("IGetTable");

export { IGetTable };
