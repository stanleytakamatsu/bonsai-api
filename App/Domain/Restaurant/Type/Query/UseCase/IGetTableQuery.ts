import { Restaurant } from "../../../Entity/Restaurant";

interface IGetTableQuery {
  Restaurant: Restaurant;
  Guid: string;
}

const IGetTableQuery = Symbol.for("IGetTableQuery");

export { IGetTableQuery };
