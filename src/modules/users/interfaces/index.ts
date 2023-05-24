import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export interface IUserSchema {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  avatar: string;
}

export interface IAvatar {
  userId: number;
  hash: string;
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'John',
    description: 'Users first name',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Doe',
    description: 'Users last name',
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'Users email',
  })
  email: string;
}

export interface ICreatedUser {
  firstName: string;
  lastName: string;
  email: string;
}

export class DownloadAvatarDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 1,
    description: 'Users id',
  })
  userId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'avatars/1.jpeg',
    description: 'Users avatar',
  })
  hash: string;
}

export interface ICreatedAvatar {
  hash: string;
}

export interface IDeletedAvatar {
  message: string;
}
