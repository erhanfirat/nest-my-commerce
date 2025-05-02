import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginationParams } from '../../common/types/pagination.type';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponseDto } from '../dto/user-response.dto';

export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async findAll({
    limit = 5,
    order = 'ASC',
    page = 0,
    sort = 'id',
  }: PaginationParams) {
    // const users = await this.entityManager.find(User, {
    //   where: { isActive: true },
    //   order: { id: 'ASC' },
    // });
    const offset = page * limit;

    const users = await this.userRepository
      .createQueryBuilder('user')
      .orderBy(`user.${sort}`, order.toUpperCase() as 'ASC' | 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    return users.map(
      (user) =>
        new UserResponseDto({
          id: user.id,
          name: user.name,
          email: user.email,
          birthdate: user.birthdate,
        }),
    );
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      this.logger.error(`Kullanıcı bulunamadı: ${id}`);
      throw new HttpException(
        `Kullanıcı bulunamadı: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const userResponse = new UserResponseDto({
      id: user.id,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
    });

    return userResponse;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto);
    const savedUser = await this.entityManager.save(User, newUser);
    this.logger.log(`Kullanıcı oluşturuldu: ${savedUser.id}`);
    return savedUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {}

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      this.logger.error(`Kullanıcı bulunamadı: ${id}`);
      throw new HttpException(
        `Kullanıcı bulunamadı: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const userResponse = new UserResponseDto({
      id: user.id,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
    });

    this.userRepository.delete(id);
    this.logger.log(`Kullanıcı silindi: ${id}`, userResponse);

    return userResponse;
  }
}
