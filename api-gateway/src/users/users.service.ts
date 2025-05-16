import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserDto,
  PaginationParams,
  SERVICES,
  UpdateUserDto,
  USER_PATTERNS,
} from '@ecommerce/types';

@Injectable()
export class UsersService {
  constructor(
    @Inject(SERVICES.USERS.name)
    private readonly usersMicroservice: ClientProxy,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersMicroservice.send(
      { cmd: USER_PATTERNS.CREATE },
      createUserDto,
    );
  }

  findAll({
    page = 1,
    sort = 'id',
    order = 'ASC',
    limit = 10,
  }: PaginationParams) {
    return this.usersMicroservice.send(
      { cmd: USER_PATTERNS.FIND_ALL },
      { page, sort, order, limit },
    );
  }

  findOne(id: number) {
    return this.usersMicroservice.send({ cmd: USER_PATTERNS.FIND_ONE }, { id });
  }

  findByEmail(email: string) {
    return this.usersMicroservice.send(
      { cmd: USER_PATTERNS.FIND_BY_EMAIL },
      { email },
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersMicroservice.send(
      { cmd: USER_PATTERNS.UPDATE },
      { id, ...updateUserDto },
    );
  }

  remove(id: number) {
    return this.usersMicroservice.send({ cmd: USER_PATTERNS.REMOVE }, { id });
  }
}
