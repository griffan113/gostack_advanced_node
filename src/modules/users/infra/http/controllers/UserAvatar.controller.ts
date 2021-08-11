import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    if (!request.file) throw new Error('No files uploaded');

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatar_filename: request.file.filename,
    });

    return response.json(user);
  }
}

export default UserAvatarController;
