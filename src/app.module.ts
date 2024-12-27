import { AuthGuard } from '@auth/auth.guard';
import { FilesController } from '@modules/Files/files.controller';
import { FilesModule } from '@modules/Files/files.module';
import { FilesService } from '@modules/Files/files.service';
import { GroupController } from '@modules/Group/group.controller';
import { GroupModule } from '@modules/Group/group.module';
import { GroupService } from '@modules/Group/group.service';
import { LogInterceptor } from '@modules/log/log.interceptor';
import { LogModule } from '@modules/log/log.module';
import { LogService } from '@modules/log/log.service';
import { PermissionController } from '@modules/Permission/permission.controller';
import { PermissionModule } from '@modules/Permission/permission.module';
import { PermissionService } from '@modules/Permission/permission.service';
import { PermissionByGroupController } from '@modules/PermissionByGroup/permissionByGroup.controller';
import { PermissionByGroupModule } from '@modules/PermissionByGroup/permissionByGroup.module';
import { PermissionByGroupService } from '@modules/PermissionByGroup/permissionByGroup.service';
import { SupplierController } from '@modules/Suppliers/supplier.controller';
import { SupplierModule } from '@modules/Suppliers/suppliers.module';
import { SupplierService } from '@modules/Suppliers/suppliers.service';
import { UserModule } from '@modules/User/user.module';
import { UsersByGroupController } from '@modules/UserByGroup/usersByGroup.controller';
import { UserByGroupModule } from '@modules/UserByGroup/usersByGroup.module';
import { UserByGroupService } from '@modules/UserByGroup/usersByGroup.service';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { GlobalQueueMiddleware } from '@queue/globalQueueMiddleware';
import { QueueModule } from '@queue/queue.module';
import { QueueService } from '@queue/queue.service';
import { AuthController } from 'src/modules/Auth/auth.controller';
import { AuthService } from 'src/modules/Auth/auth.service';
import { UserController } from 'src/modules/User/user.controller';
import { UserService } from 'src/modules/User/user.service';

@Module({
  imports: [
    QueueModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRE_ACCESS },
    }),
    JwtModule.register({
      secret: process.env.JWT_REFRESH_SECRET,
      signOptions: { expiresIn: process.env.EXPIRE_REFRESH_ACCESS },
    }),
    UserModule,
    GroupModule,
    FilesModule,
    SupplierModule,
    UserByGroupModule,
    PermissionModule,
    PermissionByGroupModule,
    LogModule,
  ],
  controllers: [
    UserController,
    AuthController,
    SupplierController,
    PermissionController,
    FilesController,
    GroupController,
    UsersByGroupController,
    PermissionByGroupController,
  ],
  providers: [
    QueueService,
    UserService,
    AuthService,
    GroupService,
    FilesService,
    SupplierService,
    PermissionService,
    PermissionByGroupService,
    UserByGroupService,
    { provide: APP_GUARD, useClass: AuthGuard },
    LogService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
  exports: [
    QueueService,
    UserService,
    AuthService,
    PermissionByGroupService,
    GroupService,
    FilesService,
    SupplierService,
    UserByGroupService,
    PermissionService,
    LogService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(GlobalQueueMiddleware).forRoutes('*');
  }
}
