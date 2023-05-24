import { IUserRepository } from '@/src/modules/users/data/user.repository';
import { Model, Connection } from 'mongoose';
import { UserSchema } from '../models/user.model';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class MongoDbUserRepository implements IUserRepository {
  private userModel: Model<any>;

  constructor(private readonly mongoDbConnection: Connection) {
    this.userModel = this.mongoDbConnection.model('users', UserSchema);
  }

  async create(
    createCustomerDTO: IUserRepository.CreateUser.Input,
  ): Promise<IUserRepository.CreateUser.Output> {
    const user = new this.userModel(createCustomerDTO);

    return user.save();
  }

  async findById(
    id: IUserRepository.FindById.Input,
  ): Promise<IUserRepository.FindById.Output> {
    try {
      const user = await this.userModel.findOne({
        _id: id,
      });

      return user;
    } catch (error: any) {
      throw new HttpException(
        { message: 'Error on find user', stack: error.stack },
        400,
      );
    }
  }
}
