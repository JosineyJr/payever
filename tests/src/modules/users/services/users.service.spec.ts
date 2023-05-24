import { UsersService } from '@/src/modules/users/services/users.service';
import { Test } from '@nestjs/testing';

describe('Users service', () => {
  let sut: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({})
  });
});
