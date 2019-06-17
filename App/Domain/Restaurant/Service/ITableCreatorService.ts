import { ICreateTableCommand } from "../Type/Command/Service/ICreateTableCommand";

interface ITableCreatorService {
  create(command: ICreateTableCommand): Promise<void>;
}

const ITableCreatorService = Symbol.for("ITableCreatorService");

export { ITableCreatorService };
