import jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import connection from '../models/connection';
import UserModel from '../models/user.model';

const generateToken = (user: IUser) => {
  const payload = {
    id: user.id,
    userName: user.username,
    vocation: user.vocation,
    level: user.level,
  };
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    algorithm: 'HS256', expiresIn: '1d',
  });
};

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: IUser): Promise<string | null> {
    const createdUser = this.model.create(user);

    if (!(await createdUser).id) {
      return null;
    }

    const token = generateToken(await createdUser);

    return token;
  }
}

export default UserService;