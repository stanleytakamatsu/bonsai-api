interface IConsumerQueueRunner {
  run(queuesNames: string[]): Promise<void>;
}

const IConsumerQueueRunner = Symbol.for('IConsumerQueueRunner');

export { IConsumerQueueRunner };
