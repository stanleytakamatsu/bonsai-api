import { IConsumerQueue } from '../IConsumerQueue';

interface IConsumerQueueFactory {
  createConsumerQueues(): IConsumerQueue[];
}

const IConsumerQueueFactory = Symbol.for('IConsumerQueueFactory');

export { IConsumerQueueFactory };
