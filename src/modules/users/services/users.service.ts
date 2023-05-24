import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDTO, ICreatedUser, IUser } from '../interfaces';
import { MessageBrokerProvider } from '@/src/shared/providers/message-broker';
import { IUserRepository } from '../data/user.repository';
import { HttpGet, HttpProvider } from '@/src/shared/providers/http';

@Injectable()
export class UsersService {
  constructor(
    private readonly messageBrokerProvider: MessageBrokerProvider,
    private readonly userRepository: IUserRepository,
    private readonly httpClient: HttpProvider,
  ) {}

  async createCustomer(user: CreateUserDTO): Promise<ICreatedUser> {
    const createdUser = await this.userRepository.create(user);

    const emailContent = `Hello ${user.firstName}, your user has been created!`;
    console.log(`Sending email to ${user.email}: ${emailContent}`);

    await this.messageBrokerProvider.sendToQueue({
      message: createdUser,
      options: { persistent: true },
    });

    return createdUser;
  }

  async findById(userId: number): Promise<IUser> {
    try {
      const user = await this.httpClient.get({ url: `/users/${userId}` });

      return user.data.data;
    } catch (error: any) {
      throw new HttpException(
        {
          message: error.message,
        },
        error.response.status,
      );
    }
  }
}
