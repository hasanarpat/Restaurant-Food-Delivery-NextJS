import bcrypt from 'bcryptjs';
import { authRepository } from './auth.repository';
import { LoginInput, RegisterInput } from './auth.schema';
import { AppError } from '@/core/errors/AppError';
import { signToken } from '@/lib/auth-token';
import { IUser } from '@/modules/user/user.schema';

export class AuthService {
  async register(data: RegisterInput) {
    // 1. Check if user exists
    const exists = await authRepository.exists(data.email);
    if (exists) {
      throw new AppError({
        message: 'Email already in use',
        statusCode: 409, // Conflict
        code: 'AUTH_EMAIL_EXISTS',
      });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(data.password, salt);

    // 3. Create user
    const user = await authRepository.create({
      email: data.email,
      passwordHash,
      profile: {
        fullName: data.fullName,
      },
      phone: data.phone,
      role: 'USER', // Default role
    } as unknown as Partial<IUser>);

    // 4. Generate token
    const token = await signToken({
      userId: user._id.toString(),
      role: user.role,
      sessionVersion: user.sessionVersion,
    });

    return { user, token };
  }

  async login(data: LoginInput) {
    // 1. Find user
    const user = await authRepository.findByEmail(data.email);

    // Generic error message for security
    const invalidCredentialsError = new AppError({
      message: 'Invalid email or password',
      statusCode: 401,
      code: 'AUTH_INVALID_CREDENTIALS',
    });

    if (!user || !user.passwordHash) {
      throw invalidCredentialsError;
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw invalidCredentialsError;
    }

    // 3. Generate token
    const token = await signToken({
      userId: user._id.toString(),
      role: user.role,
      sessionVersion: user.sessionVersion,
    });

    return { user, token };
  }
}

export const authService = new AuthService();
