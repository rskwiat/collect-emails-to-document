import type { Context } from 'hono';
import { userModel } from '../models/UserSchema';
import { userZodSchema } from '../models/UserSchema';
import * as HttpStatusCodes from '../constants/status-codes';

export async function saveUser(c: Context) {
  try {
    const { email, name, optIn } = await c.req.json();

    const validation = userZodSchema.safeParse({ email, name });

    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      return c.json(
        {
          message: 'Validation failed.',
          errors,
        },
        HttpStatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    const currentEmail = await userModel.findOne({
      email: validation.data.email,
    });

    if (currentEmail) {
      return c.json(
        {
          message: 'User already exists.',
        },
        HttpStatusCodes.OK,
      );
    }

    // Create a new user instance
    const user = new userModel({
      email: validation.data.email,
      name: validation.data.name,
      optIn,
    });

    // Save the user to the database
    await user.save();

    return c.json(
      {
        message: 'User saved successfully.',
      },
      HttpStatusCodes.OK,
    );
  } catch (error) {
    return c.json(
      {
        message: 'Error',
        error,
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function getAllUsers(c: Context) {
  const users = await userModel.find({});

  return c.json(
    {
      data: users,
    },
    HttpStatusCodes.OK,
  );
}

export async function getUserById(c: Context) {
  try {
    const { id } = await c.req.param();

    const user = await userModel.findById({ _id: id });

    if (!user) {
      return c.json(
        {
          message: 'User does not exist.',
        },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    return c.json(
      {
        data: user,
      },
      HttpStatusCodes.OK,
    );
  } catch (error) {
    return c.json(
      {
        message: 'An error occurred while retrieving the user.',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function deleteUserById(c: Context) {
  try {
    const { id } = await c.req.param();

    const user = await userModel.findByIdAndDelete({ _id: id });

    if (!user) {
      return c.json(
        {
          message: 'User not found. Deletion failed.',
        },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    return c.json(
      {
        message: 'User deleted successfully.',
        data: user,
      },
      HttpStatusCodes.OK,
    );
  } catch (error) {
    return c.json(
      {
        message: 'An error occured while deleting the user.',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}
