import { IContainerService } from "../../Container/IContainerService";
import { ILogger } from "../../Logger/ILogger";
import { IProvider } from "../../Provider/IProvider";
import { ITracer } from "../../Tracer/ITracer";
import { ConsumerQueueListener } from "../Consumer/ConsumerQueueListener";
import { IConsumerQueueListener } from "../Consumer/IConsumerQueueListener";

class ConsumerQueueProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerConsumerQueueListener();
  }

  private async registerConsumerQueueListener(): Promise<void> {
    await this.container.register(
      IConsumerQueueListener,
      () =>
        new Promise<IConsumerQueueListener>(async resolve => {
          const logger = await this.container.get<ILogger>(ILogger);

          const tracer = await this.container.get<ITracer>(ITracer);

          const listener = new ConsumerQueueListener(logger, tracer);

          resolve(listener);
        })
    );
  }
}

export { ConsumerQueueProvider };
