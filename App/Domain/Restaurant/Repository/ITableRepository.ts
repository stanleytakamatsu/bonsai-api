import { ICreateTableCommand } from "../Type/Command/Repository/ICreateTableCommand";

interface ITableRepository {
  create(command: ICreateTableCommand): Promise<void>;
}

const ITableRepository = Symbol.for("ITableRepository");

export { ITableRepository };
