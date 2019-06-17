import { serialize } from "cerialize";

import { Table } from "../../Entity/Table";

class TableMapper {
  private guid: string;
  private code: string;

  @serialize
  public get Guid(): string {
    return this.guid;
  }

  @serialize
  public get Code(): string {
    return this.code;
  }

  public static create(table: Table): TableMapper {
    const mapper = new TableMapper();

    mapper.guid = table.Guid;
    mapper.code = table.Code;

    return mapper;
  }
}

export { TableMapper };
