import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginatedResult, PaginationParams, SortOrder } from './utils/types';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(
    params: PaginationParams,
  ): Promise<PaginatedResult<UserResponseDto>> {
    const { page = 1, limit = 10, sort = 'id', order = 'ASC' } = params;

    const [users, total] = await this.userRepository.findAndCount({
      order: { [sort]: order.toUpperCase() as SortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });

    const data = users.map(this.toUserResponseDto);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.log(`Finding user by email: ${email}`);
    return this.userRepository.findOne({ where: { email } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private toUserResponseDto = (user: User): UserResponseDto => {
    return new UserResponseDto({
      id: user.id,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      role: user.role,
    });
  };

  private async getUserOrThrow(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      this.logger.warn(`⚠️ Kullanıcı bulunamadı (ID: ${id})`);
      throw new HttpException(
        `Kullanıcı bulunamadı (ID: ${id})`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
}
