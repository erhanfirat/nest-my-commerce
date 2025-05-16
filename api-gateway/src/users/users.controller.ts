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
import { ParseIntPipe } from '@nestjs/common';
import { Roles } from 'src/auth_old/decorator/roles.decorator';
import { RolesGuard } from 'src/auth_old/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth_old/guards/jwt-auth.guard';
import { OwnerOrRolesGuard } from 'src/auth_old/guards/owner-or-roles.guard';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  PaginatedResult,
  PaginationParams,
  UpdateUserDto,
  UserResponseDto,
  UserRole,
} from '@ecommerce/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  findAll(
    @Query() query: PaginationParams,
  ): Promise<PaginatedResult<UserResponseDto>> {
    return this.usersService.findAll({
      page: query.page ? query.page : 1,
      limit: query.limit ? query.limit : 10,
      sort: query.sort || 'id',
      order: query.order || 'ASC',
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnerOrRolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, {
      ...updateUserDto,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
