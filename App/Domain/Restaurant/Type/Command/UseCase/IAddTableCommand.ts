import { Restaurant } from "../../../../Restaurant/Entity/Restaurant";

interface IAddTableCommand {
  Restaurant: Restaurant;
  Code: string;
}

const IAddTableCommand = Symbol.for("IAddTableCommand");

export { IAddTableCommand };
