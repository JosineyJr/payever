export type ApplicationVariables = {
  port: number;
};

export type RabbitVariables = {
  url: string;
  queue: string;
};

export type MongoDBVariables = {
  url: string;
};


export interface IEnvironmentVariables {
  applicationPort: ApplicationVariables;
  rabbit: RabbitVariables;
  nodeEnvironment: string;
  mongoDb: MongoDBVariables;
}

export default () => {
  const environmentVariables: IEnvironmentVariables = {
    applicationPort: { port: +process.env.APPLICATION_PORT },
    nodeEnvironment: process.env.NODE_ENV,
    rabbit: {
      url: process.env.RABBIT_URL,
      queue: process.env.RABBIT_QUEUE,
  
    },
    mongoDb: { url: process.env.MONGO_URL },
  };

  return environmentVariables;
};
