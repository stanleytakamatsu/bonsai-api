import { IActionController } from "../../../Core/Controller/IActionController";

interface IAddTableController extends IActionController {}

const IAddTableController = Symbol.for("IAddTableController");

export { IAddTableController };
