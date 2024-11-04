import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res
          .status(401)
          .send({ message: 'Authorization header is missing' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = this.jwtService.verify(token);
      req['user'] = decoded;
      next();
    } catch (error) {
      return res.status(401).send({ message: 'Invalid or expired token' });
    }
  }
}
