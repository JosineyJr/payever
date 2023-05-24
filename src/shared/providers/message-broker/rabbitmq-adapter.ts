import { Channel, connect, Connection } from 'amqplib';
import { MessageBrokerProvider } from '.';
import {
  MessageBrokerConnectionOptions,
  MessageBrokerPublishToExchangeOptions,
  MessageBrokerSendToQueueOptions,
} from './interfaces';

export class RabbitMqAdapter extends MessageBrokerProvider<Connection> {
  private channelExchange: Channel;
  private channelQueue: Channel;

  constructor(queueName: string, exchangeName?: string) {
    super(queueName, exchangeName);
  }

  async connect({
    url,
    configs,
  }: MessageBrokerConnectionOptions): Promise<void> {
    const connection = await connect(url, configs);

    this.connection = connection;
  }

  async sendToQueue({
    message,
    options,
  }: MessageBrokerSendToQueueOptions): Promise<boolean> {
    if (!this.channelQueue) {
      this.channelQueue = await this.connection.createChannel();
      await this.channelQueue.assertQueue(this.queueName);
    }

    const buffMessage = Buffer.from(JSON.stringify(message));

    return this.channelQueue.sendToQueue(this.queueName, buffMessage, options);
  }

  async publishToExchange({
    message,
    options,
    routingKey,
  }: MessageBrokerPublishToExchangeOptions): Promise<boolean> {
    if (!this.channelExchange) {
      this.channelExchange = await this.connection.createChannel();
      await this.channelExchange.assertExchange(this.exchangeName, 'direct');
    }

    const buffMessage = Buffer.from(JSON.stringify(message));

    return this.channelExchange.publish(
      this.exchangeName,
      routingKey,
      buffMessage,
      {
        ...options,
      },
    );
  }
}
