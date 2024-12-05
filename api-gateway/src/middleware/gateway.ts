import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'apibeaminsecretkeyjwt');
        console.log(decoded)
        req.user = decoded;  // Gán thông tin người dùng vào `req.user`
      } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }
    next();
  }
}
