import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUser.service';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    if (!request.file) throw new Error('No files uploaded');

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      avatar_filename: request.file.filename,
    });

    // @ts-ignore
    delete user.password;

    return response.json(classToClass(user));
  }
}

export default UsersController;
