import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationOptions } from 'src/common/utils/types';
import { CreateUserDto } from '../dto/CreateUserDto';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

// DB ye bağlan

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const newUser = new User(user);
    const recUser = await this.userRepository.save(newUser);
    return recUser;
  }

  async findAll({
    page = 0,
    limit = 5,
    sort = 'id',
    order = 'asc',
  }: PaginationOptions): Promise<User[]> {
    const offset = page * limit;

    return this.userRepository
      .createQueryBuilder('user')
      .orderBy(`user.${sort}`, order.toUpperCase() as 'ASC' | 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Kullanıcı bulunamadı. ID: ${id}`);
    }

    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Kullanıcı bulunamadı. ID: ${id}`);
    }
  }
}
