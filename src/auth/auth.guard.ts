import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

import { Request } from 'express';
import { JwtPayloadI } from 'src/interfaces/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!process.env.JWT_SECRET) {
      throw new HttpException('Token not found', 401);
    }
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    try {
      const payload: JwtPayloadI = await this.jwtService.verifyAsync(token);
      if (!payload.email) {
        return false;
      }
      request.email = payload.email;
      return true;
    } catch {
      return false;
    }
  }
}
