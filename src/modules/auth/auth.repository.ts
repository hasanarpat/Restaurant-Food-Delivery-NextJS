import { User, IUser } from '@/modules/user/user.schema';

export class AuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select('+passwordHash');
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    return User.create(data);
  }

  async exists(email: string): Promise<boolean> {
    const exists = await User.exists({ email });
    return !!exists;
  }
}

export const authRepository = new AuthRepository();
