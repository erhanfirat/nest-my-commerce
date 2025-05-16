import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  PaginationParams,
  UpdateUserDto,
  USER_PATTERNS,
} from '@ecommerce/types';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: USER_PATTERNS.CREATE })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: USER_PATTERNS.FIND_ALL })
  findAll(@Payload() paginationParams: PaginationParams) {
    console.log('users-service controller findAll', paginationParams);
    return this.usersService.findAll(paginationParams);
  }

  @MessagePattern({ cmd: USER_PATTERNS.FIND_ONE })
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: USER_PATTERNS.FIND_BY_EMAIL })
  findByEmail(@Payload() email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern({ cmd: USER_PATTERNS.UPDATE })
  update(
    @Payload()
    { id, updateUserDto }: { id: number; updateUserDto: UpdateUserDto },
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern({ cmd: USER_PATTERNS.REMOVE })
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
