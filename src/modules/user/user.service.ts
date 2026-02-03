import { userRepository } from './user.repository';
import { CreateUserDTO, UpdateUserDTO } from './user.types';
import { AppError } from '@/core/errors/AppError';
import bcrypt from 'bcryptjs';

export const userService = {
  async createUser(data: CreateUserDTO) {
    // Check if user exists
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError({
        message: 'Email already exists',
        code: 'USER_EXISTS',
        statusCode: 409,
      });
    }

    // Hash password if provided (it should be for creation)
    if (data.password) {
      const salt = await bcrypt.genSalt(12);
      data.password = await bcrypt.hash(data.password, salt);
    }

    const user = await userRepository.create(data);
    return user;
  },

  async getUser(id: string) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError({
        message: 'User not found',
        code: 'USER_NOT_FOUND',
        statusCode: 404,
      });
    }
    return user;
  },

  async updateUser(id: string, data: UpdateUserDTO) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError({
        message: 'User not found',
        code: 'USER_NOT_FOUND',
        statusCode: 404,
      });
    }

    const updatedUser = await userRepository.update(id, data);
    return updatedUser;
  },

  async deleteUser(id: string) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError({
        message: 'User not found',
        code: 'USER_NOT_FOUND',
        statusCode: 404,
      });
    }
    await userRepository.softDelete(id);
  },

  async getAllUsers(params: { page: number; limit: number }) {
    return await userRepository.findAll(params);
  },
};
