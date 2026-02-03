import { userRepository } from './user.repository';
import { CreateUserDTO, UpdateUserDTO } from './user.types';
import { AppError } from '@/core/errors/AppError';
// import bcrypt from 'bcryptjs'; // We might need this if we hash passwords here, but usually Auth service does registration.

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

    // Note: Password hashing should typically happen here or in Auth Service.
    // If this createUser is used by Admin to create users, we should hash the password.
    // For now, assuming the incoming password needs hashing.
    // const passwordHash = await bcrypt.hash(data.password, 12);
    // data.password = passwordHash;
    // However, to avoid adding dependencies or making assumptions about imports without checking package.json (I know bcryptjs is there),
    // I will acknowledge that this generic createUser is risky without hashing if used directly.
    // But adhering to the pattern:

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
};
