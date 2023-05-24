import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { MongoDbUserRepository } from './infra/mongo/repositories/user.repository';
import { ConfigService } from '@nestjs/config';
import { MongoDbConnectionProvider } from '@/src/shared/providers/mongo-db/connection.provider';
import { MessageBrokerProvider } from '@/src/shared/providers/message-broker';
import { RabbitMqAdapter } from '@/src/shared/providers/message-broker/rabbitmq-adapter';
import { RabbitVariables } from '@/src/config/env';
import { AxiosAdapter } from '@/src/shared/providers/http/axios-adapter';
import { AvatarsService } from './services/avatar.service';
import { MongoDbAvatarRepository } from './infra/mongo/repositories/avatar.repository';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'RABBITMQ_CREATED_USER_QUEUE',
      useFactory: async (envFile: ConfigService) => {
        const { url, queue } = envFile.get<RabbitVariables>('rabbit');
        const rabbit = new RabbitMqAdapter(queue);

        await rabbit.connect({
          url,
        });

        return rabbit;
      },
      inject: [ConfigService],
    },
    {
      provide: 'API_HTTP_CLIENT',
      useFactory: () =>
        new AxiosAdapter({
          baseUrl: ' https://reqres.in/api',
        }),
      inject: [],
    },
    {
      provide: UsersService,
      useFactory: (
        messageBrokerProvider: MessageBrokerProvider,
        usersRepository: MongoDbUserRepository,
        httpClient: AxiosAdapter,
      ) => new UsersService(messageBrokerProvider, usersRepository, httpClient),
      inject: [
        'RABBITMQ_CREATED_USER_QUEUE',
        MongoDbUserRepository,
        'API_HTTP_CLIENT',
      ],
    },
    {
      provide: AvatarsService,
      useFactory: (
        avatarsRepository: MongoDbAvatarRepository,
        httpClient: AxiosAdapter,
        usersService: UsersService,
      ) => new AvatarsService(avatarsRepository, httpClient, usersService),
      inject: [MongoDbAvatarRepository, 'API_HTTP_CLIENT', UsersService],
    },
    MongoDbConnectionProvider.provide(),
    ConfigService,
    {
      provide: MongoDbUserRepository,
      useFactory: mongoDbConnection =>
        new MongoDbUserRepository(mongoDbConnection),
      inject: ['MONGODB_CONNECTION'],
    },
    {
      provide: MongoDbAvatarRepository,
      useFactory: mongoDbConnection =>
        new MongoDbAvatarRepository(mongoDbConnection),
      inject: ['MONGODB_CONNECTION'],
    },
  ],
})
export class UsersModule {}
