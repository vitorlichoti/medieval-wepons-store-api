import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import connection from '../models/connection';

const secret = 'secret';

const tokenGenerator = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const [[user]] = await connection.execute<RowDataPacket[]>(
    `SELECT id AS userId, username AS userName, vocation, level
     FROM Trybesmith.users
     WHERE username = ? AND password = ?`,
    [username, password],
  );
    
  const payload = { data: { ...user } };

  const token = jwt.sign(payload, secret, { expiresIn: '1d' });

  return res.status(200).json({ token });
};

export default tokenGenerator;