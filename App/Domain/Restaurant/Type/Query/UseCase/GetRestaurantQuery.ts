import { IGetRestaurantQuery } from "./IGetRestaurantQuery";

class GetRestaurantQuery implements IGetRestaurantQuery {
  private guid: string;

  public get Guid(): string {
    return this.guid;
  }

  public static create(guid: string): GetRestaurantQuery {
    const query = new GetRestaurantQuery();

    query.guid = guid;

    return query;
  }
}

export { GetRestaurantQuery };
