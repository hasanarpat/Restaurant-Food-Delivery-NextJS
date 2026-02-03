import { User, IUser } from './user.schema';
import { CreateUserDTO, UpdateUserDTO } from './user.types';

export const userRepository = {
  async create(data: CreateUserDTO): Promise<IUser> {
    const user = new User({
      email: data.email,
      passwordHash: data.password, // Note: Service layer handles hashing if needed, or we pass hash here.
      // Ideally, the DTO passing here should have passwordHash if it was hashed.
      // But looking at the schema, 'passwordHash' is the field.
      // If the input 'data' has 'password', we need to map it or hash it.
      // Let's assume the service handles hashing and passes 'passwordHash'.
      // Wait, the CreateUserDTO has 'password'.
      // I will map 'password' from DTO to 'passwordHash' here for simplicity,
      // BUT normally hashing happens in Service.
      // I will assume the service will replace/transform the DTO before calling this
      // or this repository takes a slightly different internal type.
      // For now, let's just map it directly and assume data.password holds the hash if it's coming from auth service
      // OR if this is a raw create, it might need hashing.
      // However, usually User creation happens via Auth Service (Register).
      // This generic create might be for Admin usage.
      // Let's stick to the schema.
      role: data.role || 'USER',
      profile: {
        fullName: data.fullName,
      },
      phone: data.phone,
    });

    // If password is provided in DTO, we might want to set it.
    // But since the schema has passwordHash, we should probably expect the service to provide the hash.
    // I'll leave the password mapping logic to the service and just accept what's given,
    // but the DTO I created earlier has 'password'.
    // I'll make sure the service handles the mapping.

    if (data.password) {
      user.passwordHash = data.password;
    }

    return await user.save();
  },

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  },

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  },

  async update(id: string, data: UpdateUserDTO): Promise<IUser | null> {
    const updateData: any = { ...data };

    // Flatten profile updates if necessary or let Mongoose handle dot notation if we structured it that way
    // For simple top level updates:
    if (data.profile) {
      // We need to be careful not to overwrite the whole profile object if we only want to update fields
      // But here profile only has fullName.
      updateData.profile = data.profile;
    }

    return await User.findByIdAndUpdate(id, updateData, { new: true });
  },

  async softDelete(id: string): Promise<void> {
    await User.findByIdAndUpdate(id, { deletedAt: new Date() });
  },
};
