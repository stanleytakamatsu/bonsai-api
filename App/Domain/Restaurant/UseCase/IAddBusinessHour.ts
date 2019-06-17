import { IAddBusinessHourCommand } from "../Type/Command/UseCase/IAddBusinessHourCommand";

interface IAddBusinessHour {
  execute(query: IAddBusinessHourCommand): Promise<void>;
}

const IAddBusinessHour = Symbol.for("IAddBusinessHour");

export { IAddBusinessHour };
