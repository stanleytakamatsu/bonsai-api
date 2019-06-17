import { IFindTableByGuidQuery } from "./IFindTableByGuidQuery";
import { Restaurant } from "../../../Entity/Restaurant";

class FindTableByGuidQuery implements IFindTableByGuidQuery {
  private restaurant: Restaurant;

  private guid: string;

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get Guid(): string {
    return this.guid;
  }

  public static create(guid: string, restaurant: Restaurant): FindTableByGuidQuery {
    const query = new FindTableByGuidQuery();

    query.guid = guid;
    query.restaurant = restaurant;

    return query;
  }
}

export { FindTableByGuidQuery };
