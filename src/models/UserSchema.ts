import { Schema, model } from 'mongoose';
import { z } from 'zod';

interface User {
  name: string;
  email: string;
  optIn?: boolean;
}

const emailZodSchema = z
  .string()
  .trim()
  .email()
  .transform((email) => email.toLowerCase());

const nameZodSchema = z.string().trim().min(3, {
  message: 'Name must be greater than 3 characters.',
});

const userZodSchema = z.object({
  email: emailZodSchema,
  name: nameZodSchema,
});

const userSchema = new Schema<User>({
  name: {
    type: String,
    validate: {
      validator: (value: string) => nameZodSchema.safeParse(value).success,
      message: 'Name must be greater than 3 characters.',
    },
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value: string) => emailZodSchema.safeParse(value).success,
      message: 'Invalid Email.',
    },
  },
  optIn: {
    type: Boolean,
    default: false,
  },
});

const userModel = model('user', userSchema);

export { userModel, userSchema, userZodSchema };
