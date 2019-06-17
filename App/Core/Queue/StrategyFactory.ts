import { IApplicationConfiguration } from '../../../Config/IApplicationConfiguration';
import { ILogger } from '../Logger/ILogger';
import { IAdapter } from './Adapter/IAdapter';
import { Rabbitmq } from './Adapter/Rabbitmq/Rabbitmq';
import { Adapters } from './Adapters';

class StartegyFactory {
  public static async createAdapter(
    configuration: IApplicationConfiguration,
    logger: ILogger
  ): Promise<IAdapter> {
    const queue_driver = configuration.queueDriver();

    switch (queue_driver) {
      case Adapters.RABBITMQ:
        return new Rabbitmq(configuration.rabbitmqConfigurations(), logger);
      default:
        return new Rabbitmq(configuration.rabbitmqConfigurations(), logger);
    }
  }
}

export { StartegyFactory };
