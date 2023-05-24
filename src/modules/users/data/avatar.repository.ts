import {
  DownloadAvatarDTO,
  ICreatedAvatar,
  IDeletedAvatar,
} from '../interfaces';

export namespace IAvatarRepository {
  export namespace DownloadAvatar {
    export type Input = DownloadAvatarDTO;
    export type Output = ICreatedAvatar | { base64File: string };
  }

  export namespace DeleteAvatar {
    export type Input = { userId: number };
    export type Output = IDeletedAvatar;
  }

  export namespace GetAvatar {
    export type Input = { userId: number };
    export type Output = ICreatedAvatar;
  }
}

export interface IAvatarRepository {
  download(
    dto: IAvatarRepository.DownloadAvatar.Input,
  ): Promise<IAvatarRepository.DownloadAvatar.Output>;

  get(
    dto: IAvatarRepository.GetAvatar.Input,
  ): Promise<IAvatarRepository.GetAvatar.Output>;

  delete(
    dto: IAvatarRepository.DeleteAvatar.Input,
  ): Promise<IAvatarRepository.DeleteAvatar.Output>;
}
