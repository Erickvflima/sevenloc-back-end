import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class ListSupplierDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ example: 'Fornecedor Um' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: '17855568000197' })
  @IsString()
  cnpj: string;

  @ApiProperty({ example: '9629741683' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @ApiProperty({ example: '2024-09-04T12:00:00Z' })
  @IsDateString()
  readonly createdAt: Date;

  @ApiProperty({ example: '2024-09-04T12:00:00Z' })
  @IsDateString()
  readonly updatedAt: Date;

  @ApiProperty({ example: 'admin' })
  @IsString()
  readonly createdBy: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  readonly updatedBy: string;

  constructor({
    id,
    companyName,
    email,
    cnpj,
    phone,
    updatedBy,
    createdBy,
    createdAt,
    updatedAt,
  }: {
    id: number;
    companyName: string;
    email: string;
    cnpj: string;
    phone: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.companyName = companyName;
    this.email = email;
    this.cnpj = cnpj;
    this.phone = phone;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}
