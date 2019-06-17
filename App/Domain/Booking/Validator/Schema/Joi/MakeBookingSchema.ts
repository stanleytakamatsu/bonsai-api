import * as Joi from "joi";

const MakeBookingSchema = Joi.object().keys({
  RestaurantGuid: Joi.string()
    .guid()
    .required(),
  BookingDateTime: Joi.string()
    .regex(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/)
    .required(),
  TableGuid: Joi.string()
    .guid()
    .required(),
  Name: Joi.string().required(),
  Email: Joi.string()
    .email()
    .required()
});

export { MakeBookingSchema };
