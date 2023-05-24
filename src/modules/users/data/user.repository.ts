import { CreateUserDTO, ICreatedUser, IUserSchema } from '../interfaces';

export namespace IUserRepository {
  export namespace CreateUser {
    export type Input = CreateUserDTO;
    export type Output = ICreatedUser;
  }

  export namespace FindById {
    export type Input = string;
    export type Output = IUserSchema;
  }
}

export interface IUserRepository {
  create(
    dto: IUserRepository.CreateUser.Input,
  ): Promise<IUserRepository.CreateUser.Output>;

  findById(
    clientId: IUserRepository.FindById.Input,
  ): Promise<IUserRepository.FindById.Output>;
}
