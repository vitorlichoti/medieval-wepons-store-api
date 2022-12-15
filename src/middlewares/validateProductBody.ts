import { NextFunction, Request, Response } from 'express';

const validateName = (name: string) => {
  if (!name) {
    return { err: 400, message: '"name" is required' };
  }

  if (typeof name !== 'string') {
    return { err: 422, message: '"name" must be a string' };
  }

  if (name.length < 3) {
    return { err: 422, message: '"name" length must be at least 3 characters long' };
  }

  return { err: undefined };
};

const validateAmount = (amount: string) => {
  if (!amount) {
    return { e: 400, msg: '"amount" is required' };
  }

  if (typeof amount !== 'string') {
    return { e: 422, msg: '"amount" must be a string' };
  }

  if (amount.length < 3) {
    return { e: 422, msg: '"amount" length must be at least 3 characters long' };
  }

  return { e: undefined };
};

const validateProductBody = (req: Request, res: Response, next: NextFunction) => {
  const { name, amount } = req.body;

  const { err, message } = validateName(name);

  if (err) {
    return res.status(err).json({ message });
  }

  const { e, msg } = validateAmount(amount);

  if (e) {
    return res.status(e).json({ message: msg });
  }

  next();
};

export default validateProductBody;