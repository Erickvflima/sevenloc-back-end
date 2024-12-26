import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionByGroupService } from '@modules/PermissionByGroup/permissionByGroup.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionByGroupService: PermissionByGroupService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissao = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );
    if (!requiredPermissao) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.email;
    if (!user) {
      throw new ForbiddenException('Usuário não encontrado.');
    }

    const hasPermissao = await this.permissionByGroupService.hasPermission(
      user,
      requiredPermissao,
    );
    if (!hasPermissao) {
      throw new ForbiddenException(
        'Usuário não tem permissão para realizar esta ação',
      );
    }

    return true;
  }
}
