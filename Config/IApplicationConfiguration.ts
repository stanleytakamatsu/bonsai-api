import { IWinstonConfiguration } from "../App/Core/Logger/Driver/Winston/IWinstonConfiguration";
import { IRabbitmqConfiguration } from "../App/Core/Queue/Adapter/Rabbitmq/IRabbitmqConfiguration";

interface IApplicationConfiguration {
  queueDriver(): string;
  rabbitmqConfigurations(): IRabbitmqConfiguration;
  hashDriver(): string;
  timezone(): string;
  loggerDriver(): string;
  httpServerConfigurations(): any;
  logLevel(): string;
  winstonLogger(): IWinstonConfiguration;
  databaseUrl(): string;
  tracerDriver(): string;
}

const IApplicationConfiguration = Symbol.for("IApplicationConfiguration");

export { IApplicationConfiguration };
