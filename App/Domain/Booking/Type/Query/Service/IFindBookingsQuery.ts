import { Restaurant } from "../../../../Restaurant/Entity/Restaurant";
import { IFilterQuery } from "../../../../../Core/Type/Query/IFilterQuery";

interface IFindBookingsQuery {
  Restaurant: Restaurant;
  Filter: IFilterQuery;
}

const IFindBookingsQuery = Symbol.for("IFindBookingsQuery");

export { IFindBookingsQuery };
