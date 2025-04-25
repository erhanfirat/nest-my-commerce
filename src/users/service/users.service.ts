import { Injectable } from '@nestjs/common';
import { dummyUsers } from 'src/common/utils/data';
import { PaginationOptions } from 'src/common/utils/types';
import { CreateUserDto } from '../dto/CreateUserDto';
import { UserRole, UserType } from '../utils/types';

// DB ye bağlan

@Injectable()
export class UsersService {
  private users = [...dummyUsers];

  private randomNumber = Math.floor(Math.random() * 1000); // 1330

  getAllUsers({ page = 0, limit = 5, sort, order = 'asc' }: PaginationOptions) {
    const startIndex = page * limit;
    const endIndex = startIndex + limit;

    let sortedUsers = [...this.users];

    if (sort) {
      const direction = order === 'asc' ? 1 : -1;
      sortedUsers = sortedUsers.sort((a, b) => {
        return a[sort] > b[sort] ? direction : -direction;
      });
    }

    return sortedUsers.slice(startIndex, endIndex);
  }

  getUserComments(id: number) {
    const user = this.getUserById(id);
    if (!user) {
      return null;
    }
    return { user, comments: ['comment1', 'comment2', 'comment3'] };
  }

  getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  deleteUserById(id: number) {
    const user = this.getUserById(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
      return user;
    }
    return null;
  }

  createUser(user: CreateUserDto) {
    // DB ye ekle
    const newUser: UserType = {
      id: Math.round(Math.random() * 10000000),
      ...user,
      birthdate: user.birthdate.toISOString().split('T')[0],
      // "2000-10-20T00:00:00.000Z".split("T") => ["2000-10-20", "00:00:00.000Z"][0] => "2000-10-20"
      isActive: true,
      role: UserRole.USER,
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }
}
