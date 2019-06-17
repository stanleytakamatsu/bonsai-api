import { IActionController } from "../../../Core/Controller/IActionController";

interface IRemoveBookingController extends IActionController {}

const IRemoveBookingController = Symbol.for("IRemoveBookingController");

export { IRemoveBookingController };
