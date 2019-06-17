interface IFindByGuidRestaurantQuery {
  Guid: string;
}

const IFindByGuidRestaurantQuery = Symbol.for("IFindByGuidRestaurantQuery");

export { IFindByGuidRestaurantQuery };
