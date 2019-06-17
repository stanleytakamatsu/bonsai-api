import { IAddTableCommand } from "../Type/Command/UseCase/IAddTableCommand";

interface IAddTable {
  execute(command: IAddTableCommand): Promise<void>;
}

const IAddTable = Symbol.for("IAddTable");

export { IAddTable };
