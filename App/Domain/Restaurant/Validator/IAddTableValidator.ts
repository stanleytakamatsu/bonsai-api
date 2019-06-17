import { ISchemaValidator } from "../../../Core/Validator/Interface/ISchemaValidator";
import { IAddTableParamter } from "../Type/Parameter/IAddTableParamter";

interface IAddTableValidator extends ISchemaValidator<IAddTableParamter> {}

const IAddTableValidator = Symbol.for("IAddTableValidator");

export { IAddTableValidator };
