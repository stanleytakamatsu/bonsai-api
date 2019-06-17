import { Restaurant } from "../../../../Restaurant/Entity/Restaurant";
import { IFindBookingsQuery } from "./IFindBookingsQuery";
import { IFilterQuery } from "../../../../../Core/Type/Query/IFilterQuery";
import { FilterQuery } from "../../../../../Core/Type/Query/FilterQuery";

class FindBookingsQuery implements IFindBookingsQuery {
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
  ): FindBookingsQuery {
    const query = new FindBookingsQuery();

    query.restaurant = restaurant;
    query.filter = filter;

    return query;
  }
}

export { FindBookingsQuery };
