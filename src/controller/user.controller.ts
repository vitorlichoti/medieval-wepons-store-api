import { Request, Response } from 'express';
import UserService from '../service/user.service';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const userCreated = await this.userService.create(user);
    return res.status(201).json({ token: userCreated });
  };
}

export default UserController;