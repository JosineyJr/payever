import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpProvider } from '@/src/shared/providers/http';
import { IAvatarRepository } from '../data/avatar.repository';

import { UsersService } from './users.service';

import { writeFile, readFile, unlink } from 'fs/promises';

@Injectable()
export class AvatarsService {
  private destinationPath = 'avatars';

  constructor(
    private readonly avatarsRepository: IAvatarRepository,
    private readonly httpClient: HttpProvider,
    private readonly usersService: UsersService,
  ) {}

  async download(
    userId: number,
  ): Promise<IAvatarRepository.DownloadAvatar.Output> {
    const avatarDownloaded = await this.avatarsRepository.get({ userId });

    if (avatarDownloaded) {
      const avatar = await readFile(avatarDownloaded.hash);

      return { base64File: avatar.toString('base64') };
    }

    const user = await this.usersService.findById(userId);

    const image = await this.httpClient.get({
      url: user.avatar,
      responseType: 'arraybuffer',
    });

    const [, fileType] = image.headers['content-type'].split('/');

    const imageHash = `${
      this.destinationPath
    }/${userId}-${Date.now()}.${fileType}`;

    await writeFile(imageHash, image.data);

    const createdUser = await this.avatarsRepository.download({
      userId,
      hash: imageHash,
    });

    return createdUser;
  }

  async delete(userId: number) {
    const avatar = await this.avatarsRepository.get({ userId });

    if (!avatar) {
      throw new BadRequestException('Avatar does not exist');
    }

    await unlink(avatar.hash);

    return this.avatarsRepository.delete({ userId });
  }
}
