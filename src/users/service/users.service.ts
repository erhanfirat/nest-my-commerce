import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import {
  PaginationParams,
  PaginatedResult,
  SortOrder,
} from '../../common/types/types';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.getUserOrThrow(id);
    return this.toUserResponseDto(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);

    this.logger.log(`✅ Kullanıcı oluşturuldu (ID: ${savedUser.id})`);

    return this.toUserResponseDto(savedUser);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.getUserOrThrow(id);

    const updatedUser = this.userRepository.merge(user, updateUserDto);
    const savedUser = await this.userRepository.save(updatedUser);

    this.logger.log(`✏️ Kullanıcı güncellendi (ID: ${id})`);

    return this.toUserResponseDto(savedUser);
  }

  async remove(id: number): Promise<UserResponseDto> {
    const user = await this.getUserOrThrow(id);

    await this.userRepository.delete(id);

    this.logger.log(`🗑️ Kullanıcı silindi (ID: ${id})`);

    return this.toUserResponseDto(user);
  }

  private toUserResponseDto(user: User): UserResponseDto {
    return new UserResponseDto({
      id: user.id,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
    });
  }

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
