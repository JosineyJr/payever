import {
  MessageBrokerConnectionOptions,
  MessageBrokerPublishToExchangeOptions,
  MessageBrokerSendToQueueOptions,
} from './interfaces';

export abstract class MessageBrokerProvider<ConnectionType = any> {
  protected queueName: string;
  protected connection: ConnectionType;
  protected exchangeName?: string;

  constructor(queueName: string, exchangeName?: string) {
    this.queueName = queueName;
    this.exchangeName = exchangeName;
  }

  abstract connect({
    url,
    configs,
  }: MessageBrokerConnectionOptions): Promise<void>;

  abstract sendToQueue({
    message,
    options,
  }: MessageBrokerSendToQueueOptions): Promise<boolean>;

  publishToExchange?({
    message,
    options,
  }: MessageBrokerPublishToExchangeOptions): Promise<boolean>;
}
