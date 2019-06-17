import { IFilterQuery } from "../../../../../Core/Type/Query/IFilterQuery";
import { Restaurant } from "../../../../Restaurant/Entity/Restaurant";

interface IGetBookingsQuery {
  Restaurant: Restaurant;
  Filter: IFilterQuery;
}

const IGetBookingsQuery = Symbol.for("IGetBookingsQuery");

export { IGetBookingsQuery };
