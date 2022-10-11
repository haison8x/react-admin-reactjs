import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  public override async canActivate(context: ExecutionContext): Promise<boolean> {
    // https://github.com/nestjs/nest/issues/964#issuecomment-480834786
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return Promise.resolve(true);
    }

    const isAuthenticated = await super.canActivate(context);
    return Promise.resolve(<boolean>isAuthenticated);
  }

  public getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest<Request>();
  }
}
