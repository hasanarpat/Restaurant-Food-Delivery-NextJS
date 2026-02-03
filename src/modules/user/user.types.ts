import { IUser } from './user.schema';

export type CreateUserDTO = {
  email: string;
  password?: string;
  fullName: string;
  role?: 'USER' | 'ADMIN' | 'STAFF';
  phone?: string;
};

export type UpdateUserDTO = {
  profile?: {
    fullName?: string;
  };
  phone?: string;
  email?: string;
  role?: 'USER' | 'ADMIN' | 'STAFF';
  isVerified?: boolean;
};

export type UserResponse = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
};
