import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to attach user info after authentication
export interface AuthRequest extends Request {
  user?: {
    id: string;
    isAdmin: boolean;
  };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  let token;

  // 1. Check if Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract token from string ("Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        throw new Error('Token is missing');
      }

      // 3. Verify token using JWT_SECRET

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as { id: string; isAdmin: boolean };


      // 4. Attach decoded user data to request object for downstream controllers
      req.user = decoded;

      // 5. Proceed to the next middleware or controller
      next();
      return;
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }
};