import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import env from './config/env';

@Module({
  imports: [ConfigModule.forRoot({ load: [env], isGlobal: true }), UsersModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
