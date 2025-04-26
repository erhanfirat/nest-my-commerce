import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { SortOrder } from 'src/common/utils/types';
import { CreateUserDto } from '../dto/CreateUserDto';
import { SuperAdminGuard } from '../../auth/guards/super-admin.guard';
import { ResponseInterceptor } from '../interceptor/response.interceptor';
import { ConfigService } from '@nestjs/config';

@Controller('users') // localhost:3000/users
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {
    // this.usersService = usersService;
  }

  @Post('register')
  async createUser(@Body() newUser: CreateUserDto) {
    const user = await this.usersService.createUser(newUser);
    return user;
  }

  @Get() // localhost:3000/users/1/5/name/asc
  @UseInterceptors(ResponseInterceptor)
  async getAllUsers(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('sort') sort: string,
    @Query('order') order: SortOrder,
  ) {
    const users = await this.usersService.findAll({ page, limit, sort, order });
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Delete(':id')
  @UseGuards(SuperAdminGuard)
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);

    return 'User deleted successfully.';
  }
}
