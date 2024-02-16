import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const jwt_secret:string = process.env.JWT_SECRET_KEY||'';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Bearer token is required' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    (req as any).user = decoded;
    next();
  });
};

export default isAuthenticated;
