import * as Joi from "joi";

const MakeBookingSchema = Joi.object().keys({
  RestaurantGuid: Joi.string()
    .guid()
    .required(),
  ReservationDateTime: Joi.date().required()
});

export { MakeBookingSchema };
