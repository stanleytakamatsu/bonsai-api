import { IRegisterRestaurantCommand } from "../Type/Command/UseCase/IRegisterRestaurantCommand";

interface IRegisterRestaurant {
  execute(command: IRegisterRestaurantCommand): Promise<void>;
}

const IRegisterRestaurant = Symbol.for("IRegisterRestaurant");

export { IRegisterRestaurant };
