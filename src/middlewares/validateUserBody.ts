import { NextFunction, Request, Response } from 'express';

const validateUserName = (username: string) => {
  if (!username) {
    return { err: 400, message: '"username" is required' };
  }

  if (typeof username !== 'string') {
    return { err: 422, message: '"username" must be a string' };
  }

  if (username.length < 3) {
    return { err: 422, message: '"username" length must be at least 3 characters long' };
  }

  return { err: undefined };
};

const validateVocation = (vocation: string) => {
  if (!vocation) {
    return { e: 400, msg: '"vocation" is required' };
  }

  if (typeof vocation !== 'string') {
    return { e: 422, msg: '"vocation" must be a string' };
  }

  if (vocation.length < 3) {
    return { e: 422, msg: '"vocation" length must be at least 3 characters long' };
  }

  return { e: undefined };
};

const validateLevel = (level: number) => {
  if (!level && level !== 0) {
    return { e: 400, msg: '"level" is required' };
  }

  if (typeof level !== 'number') {
    return { e: 422, msg: '"level" must be a number' };
  }

  if (level < 1) {
    return { e: 422, msg: '"level" must be greater than or equal to 1' };
  }

  return { e: undefined };
};

const validatePassword = (password: string) => {
  if (!password) {
    return { e: 400, msg: '"password" is required' };
  }

  if (typeof password !== 'string') {
    return { e: 422, msg: '"password" must be a string' };
  }

  if (password.length < 8) {
    return { e: 422, msg: '"password" length must be at least 8 characters long' };
  }

  return { e: undefined };
};

const validateUserBody = (req: Request, res: Response, next: NextFunction) => {
  const { username, vocation, level, password } = req.body;

  const user = validateUserName(username);

  if (user.err) {
    return res.status(user.err).json({ message: user.message });
  }

  const userVoc = validateVocation(vocation);

  if (userVoc.e) {
    return res.status(userVoc.e).json({ message: userVoc.msg });
  }

  const userLevel = validateLevel(level);

  if (userLevel.e) {
    return res.status(userLevel.e).json({ message: userLevel.msg });
  }

  const userPassword = validatePassword(password);

  if (userPassword.e) {
    return res.status(userPassword.e).json({ message: userPassword.msg });
  }

  next();
};

export default validateUserBody;