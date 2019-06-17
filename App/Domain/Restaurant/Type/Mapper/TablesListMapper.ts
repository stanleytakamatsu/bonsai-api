import { serializeAs } from "cerialize";
import { Table } from "../../Entity/Table";
import { RestaurantMapper } from "./RestaurantMapper";
import { TableMapper } from "./TableMapper";

class TablesListMapper {
  private data: TableMapper[];

  @serializeAs(RestaurantMapper)
  public get Data(): TableMapper[] {
    return this.data;
  }

  public static create(tables: Table[]): TablesListMapper {
    const mapper = new TablesListMapper();

    mapper.data = tables.map(table => TableMapper.create(table));

    return mapper;
  }
}

export { TablesListMapper };
