import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationParams } from '../common/types/pagination.type';
import { ParseIntPipe } from '@nestjs/common';
import { CapitalizeNamePipe } from '../common/pipes/capitalize-name.pipe';
import { SuperAdminGuard } from '../common/guards/super-admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: PaginationParams) {
    return this.usersService.findAll({
      page: query.page ? parseInt(query.page as any, 10) : 1,
      limit: query.limit ? parseInt(query.limit as any, 10) : 10,
      sort: query.sort || 'id',
      order: query.order || 'ASC'
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Body('firstName', CapitalizeNamePipe) firstName: string,
    @Body('lastName', CapitalizeNamePipe) lastName: string,
  ) {
    return this.usersService.create({
      ...createUserDto,
      firstName,
      lastName
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Body('firstName', CapitalizeNamePipe) firstName: string,
    @Body('lastName', CapitalizeNamePipe) lastName: string,
  ) {
    return this.usersService.update(id, {
      ...updateUserDto,
      ...(firstName && { firstName }),
      ...(lastName && { lastName })
    });
  }

  @Delete(':id')
  @UseGuards(SuperAdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
} 