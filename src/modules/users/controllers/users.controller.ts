import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDTO, ICreatedUser } from '../interfaces';
import { AvatarsService } from '../services/avatar.service';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly avatarsService: AvatarsService,
  ) {}

  @Post()
  async create(
    @Body()
    createCustomerDTO: CreateUserDTO,
  ): Promise<ICreatedUser> {
    return this.usersService.createCustomer(createCustomerDTO);
  }

  @Get(':id')
  async findById(@Param('id') userId: number) {
    return this.usersService.findById(userId);
  }

  @Get(':id/avatar')
  async download(@Param('id') userId: number) {
    return this.avatarsService.download(userId);
  }

  @Delete(':id/avatar')
  async delete(@Param('id') userId: number) {
    return this.avatarsService.delete(userId);
  }
}
