import { IBusinessHourModel } from "./IBusinessHourModel";

interface IRestaurantModel {
  id: string;
  guid: string;
  name: string;
  businessHours: IBusinessHourModel[];
  createdAt: Date;
  updatedAt: Date;
}

export { IRestaurantModel };
