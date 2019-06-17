import { Restaurant } from "../../../Entity/Restaurant";

interface IFindTableByGuidQuery {
  Restaurant: Restaurant;
  Guid: string;
}

const IFindTableByGuidQuery = Symbol.for("IFindTableByGuidQuery");

export { IFindTableByGuidQuery };
