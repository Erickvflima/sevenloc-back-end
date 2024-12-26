import { ListSupplierDTO } from './dto/listSupplier.dto';
import { SupplierEntity } from './entity/supplier.entity';

export class SupplierFactory {
  static mapSuppliersToDTO(supplier: SupplierEntity): ListSupplierDTO {
    return new ListSupplierDTO({
      id: supplier.id,
      companyName: supplier.companyName,
      cnpj: supplier.cnpj,
      email: supplier.email,
      phone: supplier.phone,
      updatedBy: supplier.updatedBy,
      createdBy: supplier.createdBy,
      createdAt: supplier.createdAt,
      updatedAt: supplier.updatedAt,
    });
  }
}
