import { Restaurant } from "../../../Entity/Restaurant";
import { IGetTablesQuery } from "./IGetTablesQuery";

class GetTablesQuery implements IGetTablesQuery {
  private restaurant: Restaurant;

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public static create(restaurant: Restaurant): GetTablesQuery {
    const query = new GetTablesQuery();

    query.restaurant = restaurant;

    return query;
  }
}

export { GetTablesQuery };
