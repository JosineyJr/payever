import { IAvatarRepository } from '@/src/modules/users/data/avatar.repository';
import { Model, Connection } from 'mongoose';
import { AvatarSchema } from '../models/avatar.model';
import { HttpException, Injectable } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class MongoDbAvatarRepository implements IAvatarRepository {
  private avatarModel: Model<any>;

  constructor(private readonly mongoDbConnection: Connection) {
    this.avatarModel = this.mongoDbConnection.model('avatars', AvatarSchema);
  }

  async download(
    downloadAvatarDTO: IAvatarRepository.DownloadAvatar.Input,
  ): Promise<IAvatarRepository.DownloadAvatar.Output> {
    const avatar = new this.avatarModel(downloadAvatarDTO);

    return avatar.save();
  }

  async get({ userId }: IAvatarRepository.GetAvatar.Input) {
    const avatar = await this.avatarModel.findOne({ userId });

    return avatar;
  }

  async delete({
    userId,
  }: IAvatarRepository.DeleteAvatar.Input): Promise<IAvatarRepository.DeleteAvatar.Output> {
    await this.avatarModel.deleteOne({ userId });

    return { message: 'Avatar has been deleted' };
  }
}
