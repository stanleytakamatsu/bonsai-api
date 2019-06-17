import { Document } from "mongoose";

import { IRestaurantModel } from "../../Model/IRestaurantModel";

type IRestaurantMongooseModel = IRestaurantModel & Document;

export { IRestaurantMongooseModel };
