import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import connection from '../models/connection';

const secret = 'secret';

// const jwtConfig = {
//   expiresIn: '7d',
//   algorithm: 'HS256',
// };

const tokenGenerator = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const [[user]] = await connection.execute<RowDataPacket[]>(
    'SELECT id, username FROM Trybesmith.users WHERE username = ? AND password = ?',
    [username, password],
  );
  console.log(user);
    
  const payload = { data: { userId: user.id, username: user.username } };

  const token = jwt.sign(payload, secret);

  return res.status(200).json({ token });
};

export default tokenGenerator;