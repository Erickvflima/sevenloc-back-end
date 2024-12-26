import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entity/supplier.sevenloc.entity';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './suppliers.service';
import { SupplierFactory } from './suppliers.factory';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity])],
  controllers: [SupplierController],
  providers: [SupplierService, SupplierFactory],
  exports: [SupplierService],
})
export class SupplierModule {}
