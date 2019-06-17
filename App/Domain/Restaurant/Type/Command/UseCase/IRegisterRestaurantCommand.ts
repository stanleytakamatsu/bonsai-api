interface IRegisterRestaurantCommand {
  Name: string;
}

const IRegisterRestaurantCommand = Symbol.for("IRegisterRestaurantCommand");

export { IRegisterRestaurantCommand };
