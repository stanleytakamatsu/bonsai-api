import { IApplicationConfiguration } from "../../../../Config/IApplicationConfiguration";
import { IContainerService } from "../../Container/IContainerService";
import { ILogger } from "../../Logger/ILogger";
import { IProvider } from "../../Provider/IProvider";
import { IQueueFactory } from "../IQueueFactory";
import { QueueFactory } from "../QueueFactory";
import { StartegyFactory } from "../StrategyFactory";

class QueueProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerQueueFactory();
  }

  private async registerQueueFactory(): Promise<void> {
    await this.container.register<IQueueFactory>(
      IQueueFactory,
      () =>
        new Promise<IQueueFactory>(async resolve => {
          const configuration = await this.container.get<IApplicationConfiguration>(
            IApplicationConfiguration
          );
          const logger = await this.container.get<ILogger>(ILogger);
          const queueAdapter = await StartegyFactory.createAdapter(configuration, logger);

          await queueAdapter.setup();

          const queueFactory = new QueueFactory(queueAdapter);

          resolve(queueFactory);
        })
    );
  }
}

export { QueueProvider };
