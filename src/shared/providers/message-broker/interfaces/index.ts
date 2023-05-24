export type MessageBrokerConnectionOptions = {
  url: string;
  configs?: Record<string, any>;
};

export type MessageBrokerSendToQueueOptions = {
  message: Record<string, any>;
  options?: Record<string, any>;
};

export type MessageBrokerPublishToExchangeOptions = {
  routingKey: string;
  message: Record<string, any>;
  options?: Record<string, any>;
};
