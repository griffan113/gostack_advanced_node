import ShowProfileService from '@modules/users/services/ShowProfile.service';
import UpdateProfileService from '@modules/users/services/UpdateProfile.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    // @ts-ignore
    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    // @ts-ignore
    delete user.password;

    return response.json(user);
  }
}

export default ProfileController;
