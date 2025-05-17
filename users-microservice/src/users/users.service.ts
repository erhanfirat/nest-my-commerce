import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateUserDto,
  CustomRpcException,
  PaginatedResult,
  PaginationParams,
  SortOrder,
  UpdateUserDto,
  UserResponseDto,
} from '@ecommerce/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);

    this.logger.log(`✅ Kullanıcı oluşturuldu (ID: ${savedUser.id})`);

    return this.toUserResponseDto(savedUser);
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

  async findOne(id: number) {
    const user = await this.getUserOrThrow(id);
    return this.toUserResponseDto(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.getUserOrThrow(id);

    const updatedUser = this.userRepository.merge(user, updateUserDto);
    const savedUser = await this.userRepository.save(updatedUser);

    this.logger.log(`✏️ Kullanıcı güncellendi (ID: ${id})`);

    return this.toUserResponseDto(savedUser);
  }

  async remove(id: number) {
    const user = await this.getUserOrThrow(id);

    await this.userRepository.delete(id);

    this.logger.log(`🗑️ Kullanıcı silindi (ID: ${id})`);

    return this.toUserResponseDto(user);
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
      throw new CustomRpcException(
        HttpStatus.NOT_FOUND,
        'Aradığınız kişiye ulaşılamıyor.',
      );
    }

    return user;
  }
}
