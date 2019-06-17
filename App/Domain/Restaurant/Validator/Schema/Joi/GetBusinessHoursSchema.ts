import * as Joi from "joi";

const GetBusinessHoursSchema = Joi.object().keys({
  RestaurantGuid: Joi.string()
    .guid()
    .required()
});

export { GetBusinessHoursSchema };
