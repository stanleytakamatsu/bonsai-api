import { Restaurant } from "../../../Entity/Restaurant";

interface IGetTablesQuery {
  Restaurant: Restaurant;
}

const IGetTablesQuery = Symbol.for("IGetTablesQuery");

export { IGetTablesQuery };
