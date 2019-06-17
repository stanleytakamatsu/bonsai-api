interface IGetRestaurantQuery {
  Guid: string;
}

const IGetRestaurantQuery = Symbol.for("IGetRestaurantQuery");

export { IGetRestaurantQuery };
