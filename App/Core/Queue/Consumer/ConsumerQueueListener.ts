import { ILogger } from "../../Logger/ILogger";
import { ITracer } from "../../Tracer/ITracer";
import { IQueue } from "../IQueue";
import { IQueueMessage } from "../Type/Dto/IQueueMessage";
import { IConsumerQueueListener } from "./IConsumerQueueListener";
import { IConsumerQueueReceiver } from "./IConsumerQueueReceiver";

class ConsumerQueueListener implements IConsumerQueueListener {
  public constructor(private readonly logger: ILogger, private readonly tracer: ITracer) {}

  public async listen(queue: IQueue, receiver: IConsumerQueueReceiver): Promise<void> {
    this.logger.info(undefined, { event: "listen", queue: queue.QueueName });

    await queue.subscribe(async (data: IQueueMessage) => this.receive(queue, receiver, data));
  }

  private async receive(
    queue: IQueue,
    receiver: IConsumerQueueReceiver,
    message: IQueueMessage
  ): Promise<void> {
    const traceScope = this.tracer.createScope("queue.consumer");

    const traceSpan = traceScope.getSpan();

    try {
      traceSpan.addTags({
        "queue.messageId": message.MessageId,
        "queue.payload": message.Content,
        "resource.name": queue.QueueName,
        "service.name": "bonsai-consumer",
        "span.kind": "server",
        "span.type": "queue"
      });

      this.logger.info(undefined, {
        content: message.Content,
        event: "recv",
        messageId: message.MessageId,
        queue: queue.QueueName
      });

      await receiver.receive(message);

      traceScope.close();

      this.logger.info(undefined, {
        event: "ack",
        messageId: message.MessageId,
        queue: queue.QueueName
      });

      await queue.ack(message);
    } catch (error) {
      traceSpan.setTag("error", true);
      traceSpan.addTags({
        "error.msg": error.message,
        "error.stack": error.stack,
        "error.type": error.name
      });

      traceScope.close();

      this.logger.error(undefined, {
        errorMessage: error.message,
        errorStack: error.stack,
        errorType: error.constructor.name,
        event: "reject",
        messageId: message.MessageId,
        queue: queue.QueueName
      });

      await queue.reject(message);
    }
  }
}

export { ConsumerQueueListener };
