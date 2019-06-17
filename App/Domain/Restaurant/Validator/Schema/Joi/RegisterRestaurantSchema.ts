import * as Joi from "joi";

const RegisterRestaurantSchema = Joi.object().keys({
  Name: Joi.string().required()
});

export { RegisterRestaurantSchema };
