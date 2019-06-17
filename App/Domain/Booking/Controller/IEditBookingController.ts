import { IActionController } from "../../../Core/Controller/IActionController";

interface IEditBookingController extends IActionController {}

const IEditBookingController = Symbol.for("IEditBookingController");

export { IEditBookingController };
