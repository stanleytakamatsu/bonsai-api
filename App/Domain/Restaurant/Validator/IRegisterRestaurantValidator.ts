import { ISchemaValidator } from "../../../Core/Validator/Interface/ISchemaValidator";
import { IRegisterRestaurantParamter } from "../Type/Parameter/IRegisterRestaurantParamter";

interface IRegisterRestaurantValidator extends ISchemaValidator<IRegisterRestaurantParamter> {}

const IRegisterRestaurantValidator = Symbol.for("IRegisterRestaurantValidator");

export { IRegisterRestaurantValidator };
