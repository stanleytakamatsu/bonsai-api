import { Table } from "../../../Entity/Table";
import { ICreateTableCommand } from "./ICreateTableCommand";

class CreateTableCommand implements ICreateTableCommand {
  private table: Table;

  public get Table(): Table {
    return this.table;
  }

  public static create(table: Table): CreateTableCommand {
    const command = new CreateTableCommand();

    command.table = table;

    return command;
  }
}

export { CreateTableCommand };
