import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationParams } from '../common/types/pagination.type';
import * as fs from 'fs';
import * as path from 'path';

interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  [key: string]: any;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private users: User[] = [];
  private nextId = 1;

  constructor() {
    this.loadDummyData();
  }

  private loadDummyData(): void {
    try {
      const filePath = path.join(process.cwd(), 'src/data/dummyUsers.json');
      const data = fs.readFileSync(filePath, 'utf-8');
      const users = JSON.parse(data) as UserData[];

      this.users = users.map((user, index: number) => ({
        ...user,
        id: index + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      this.nextId = this.users.length + 1;
      this.logger.log(`${this.users.length} kullanıcı yüklendi`);
    } catch (error) {
      this.logger.error(
        'Dummy kullanıcı verileri yüklenemedi',
        error instanceof Error ? error.stack : '',
      );
      this.users = [];
    }
  }

  findAll(params: PaginationParams): PaginatedUsers {
    const { page = 1, limit = 10, sort = 'id', order = 'ASC' } = params;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const sortedUsers = [...this.users].sort((a, b) => {
      const aValue = a[sort as keyof User];
      const bValue = b[sort as keyof User];

      if (order === 'ASC') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
      total: this.users.length,
      page,
      limit,
    };
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`${id} ID'li kullanıcı bulunamadı`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.nextId++,
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`${id} ID'li kullanıcı bulunamadı`);
    }

    const updatedUser = {
      ...this.users[index],
      ...updateUserDto,
      updatedAt: new Date(),
    };

    this.users[index] = updatedUser;
    return updatedUser;
  }

  remove(id: number): void {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`${id} ID'li kullanıcı bulunamadı`);
    }

    this.users.splice(index, 1);
    this.logger.log(`${id} ID'li kullanıcı silindi`);
  }
}
