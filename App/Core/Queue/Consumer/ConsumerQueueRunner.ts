import { ConsumerQueueNotFoundError } from '../../Error/Consumer/ConsumerQueueNotFoundError';
import { IConsumerQueue } from '../IConsumerQueue';
import { IConsumerQueueListener } from './IConsumerQueueListener';
import { IConsumerQueueRunner } from './IConsumerQueueRunner';

class ConsumerQueueRunner implements IConsumerQueueRunner {
  public constructor(
    private readonly consumers: IConsumerQueue[],
    private readonly queueListener: IConsumerQueueListener
  ) {}

  public async run(queuesNames: string[]): Promise<void> {
    const promises = [];

    queuesNames.forEach(name => {
      const consumer = this.consumers.find(c => c.QueueName === name);

      if (consumer === undefined) {
        throw new ConsumerQueueNotFoundError(name);
      }

      const promise = this.queueListener.listen(consumer.Queue, consumer.Receiver);

      promises.push(promise);
    });

    await Promise.all(promises);
  }
}

export { ConsumerQueueRunner };
