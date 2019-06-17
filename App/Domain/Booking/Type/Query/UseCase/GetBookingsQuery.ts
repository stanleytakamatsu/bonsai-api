import { Restaurant } from "../../../../Restaurant/Entity/Restaurant";
import { IGetBookingsQuery } from "./IGetBookingsQuery";
import { IFilterQuery } from "../../../../../Core/Type/Query/IFilterQuery";
import { FilterQuery } from "../../../../../Core/Type/Query/FilterQuery";

class GetBookingsQuery implements IGetBookingsQuery {
  private restaurant: Restaurant;

  private filter: IFilterQuery;

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get Filter(): IFilterQuery {
    return this.filter;
  }

  public static create(
    restaurant: Restaurant,
    filter: IFilterQuery = new FilterQuery()
  ): GetBookingsQuery {
    const query = new GetBookingsQuery();

    query.restaurant = restaurant;
    query.filter = filter;

    return query;
  }
}

export { GetBookingsQuery };
