import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { SortOrder } from 'src/common/utils/types';
import { CreateUserDto } from '../dto/CreateUserDto';
import { Request, Response } from 'express';
import { APP_AUTHOR, APP_VERSION } from 'src/common/constants/app-info';
import { ConvertIsoToDatePipe } from '../pipe/convert-iso-to-date.pipe';
import { SuperAdminGuard } from '../guard/super-admin.guard';
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

  @Get() // localhost:3000/users/1/5/name/asc
  @UseInterceptors(ResponseInterceptor)
  @Header('X-App-Version', APP_VERSION)
  @Header('X-Powered-By', APP_AUTHOR)
  getAllUsers(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('sort') sort: string,
    @Query('order') order: SortOrder,
  ) {
    console.log(
      'DATABASE_URL > ',
      this.configService.get<string>('DATABASE_URL'),
      process.env.DATABASE_URL,
    );

    return this.usersService.getAllUsers({ page, limit, sort, order });
  }

  @Get(':id/comments/:commentId') // localhost:3000/users/1/comments
  getUserComments(
    @Param('id', ParseIntPipe) id: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('id', id);
    console.log('commentId', commentId);
    const result = this.usersService.getUserComments(id);
    if (!result) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    res.status(200).json(result);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Delete(':id')
  @UseGuards(SuperAdminGuard)
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.deleteUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Post('register')
  @HttpCode(201)
  // @UsePipes(new ValidationPipe())
  createUser(
    @Body('birthdate', ConvertIsoToDatePipe) birthdate: Date,
    @Body() body: Omit<CreateUserDto, 'birthDate'>,
  ) {
    const newUser = { ...body, birthdate };
    console.log('birthdate', birthdate);
    console.log('newUser', newUser);
    console.log('typeof newUser.birthdate', typeof newUser.birthdate);
    console.log(
      'newUser.birthdate instanceof Date',
      newUser.birthdate instanceof Date,
    );
    const user = this.usersService.createUser(newUser);
    return user;
  }
}
