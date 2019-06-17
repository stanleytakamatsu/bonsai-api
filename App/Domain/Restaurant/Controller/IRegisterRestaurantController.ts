import { IActionController } from "../../../Core/Controller/IActionController";

interface IRegisterRestaurantController extends IActionController {}

const IRegisterRestaurantController = Symbol.for("IRegisterRestaurantController");

export { IRegisterRestaurantController };
