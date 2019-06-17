import { IFindByGuidRestaurantQuery } from "./IFindByGuidRestaurantQuery";

class FindByGuidRestaurantQuery implements IFindByGuidRestaurantQuery {
  private guid: string;

  public get Guid(): string {
    return this.guid;
  }

  public static create(guid: string): FindByGuidRestaurantQuery {
    const query = new FindByGuidRestaurantQuery();

    query.guid = guid;

    return query;
  }
}

export { FindByGuidRestaurantQuery };
