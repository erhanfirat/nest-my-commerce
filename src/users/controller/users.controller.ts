import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginatedResult, PaginationParams } from '../../common/types/types';
import { ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { SuperAdminGuard } from 'src/auth/guards/super-admin.guard';
import { UserResponseDto } from '../dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query() query: PaginationParams,
  ): Promise<PaginatedResult<UserResponseDto>> {
    const users = await this.usersService.findAll({
      page: query.page ? parseInt(String(query.page), 10) : 1,
      limit: query.limit ? parseInt(String(query.limit), 10) : 10,
      sort: query.sort || 'id',
      order: query.order || 'ASC',
    });
    return users;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(SuperAdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, {
      ...updateUserDto,
    });
  }

  @Delete(':id')
  //@UseGuards(SuperAdminGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.remove(id);
    return user;
  }
}
