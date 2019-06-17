import { IGetTableQuery } from "./IGetTableQuery";
import { Restaurant } from "../../../Entity/Restaurant";

class GetTableQuery implements IGetTableQuery {
  private restaurant: Restaurant;

  private guid: string;

  public get Guid(): string {
    return this.guid;
  }

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public static create(tableGuid: string, restaurant: Restaurant): GetTableQuery {
    const query = new GetTableQuery();

    query.guid = tableGuid;
    query.restaurant = restaurant;

    return query;
  }
}

export { GetTableQuery };
