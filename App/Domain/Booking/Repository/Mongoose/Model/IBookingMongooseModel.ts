import { Document } from "mongoose";

import { IBookingModel } from "../../Model/IBookingModel";

type IBookingMongooseModel = IBookingModel & Document;

export { IBookingMongooseModel };
