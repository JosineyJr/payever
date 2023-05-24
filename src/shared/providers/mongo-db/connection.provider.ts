import { MongoDBVariables } from '@/src/config/env';
import { Injectable, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

@Injectable()
export class MongoDbConnectionProvider {
  static provide(): Provider {
    return {
      provide: 'MONGODB_CONNECTION',
      useFactory: async (
        envFile: ConfigService,
      ): Promise<mongoose.Connection> => {
        const connectionUrl = envFile.get<MongoDBVariables>('mongoDb').url;

        return mongoose.createConnection(connectionUrl);
      },
      inject: [ConfigService],
    };
  }
}
