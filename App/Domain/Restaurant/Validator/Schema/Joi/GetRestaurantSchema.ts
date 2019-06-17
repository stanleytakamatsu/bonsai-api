import * as Joi from "joi";

const GetRestaurantSchema = Joi.object().keys({
  Guid: Joi.string()
    .guid()
    .required()
});

export { GetRestaurantSchema };
