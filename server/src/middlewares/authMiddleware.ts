import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../exception/BadRequestError';
import { UnauthorizedError } from '../exception/UnauthorizedError';

const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new BadRequestError('Token não fornecido');
    
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new BadRequestError('Token malformado'); 
  }

    try{
        jwt.verify(token, JWT_SECRET);
        next();
    }catch {
        throw new UnauthorizedError('Token inválido ou expirado');
    }
}

export default authMiddleware
