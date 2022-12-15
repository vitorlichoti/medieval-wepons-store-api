import { NextFunction, Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import connection from '../models/connection';

const inputValidation = (username: string, password: string): string => {
  if (!username) {
    return '"username" is required';
  }

  if (!password) {
    return '"password" is required';
  }

  return 'OK';
};

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  const message = inputValidation(username, password);

  if (message !== 'OK') {
    return res.status(400).json({ message });
  }

  const [checkDB] = await connection.execute<RowDataPacket[]>(
    'SELECT username, password FROM Trybesmith.users WHERE username = ? AND password = ?',
    [username, password],
  );

  if (checkDB.length <= 0) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }

  next();
};

export default loginValidation;