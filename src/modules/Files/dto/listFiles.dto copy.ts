import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsString } from 'class-validator';

export class ListFilesDTO {
  @ApiProperty({ example: 1 })
  @IsInt()
  readonly id: number;

  @ApiProperty({ example: 'contrato' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'arquivos/cliente' })
  @IsString()
  readonly path: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  readonly supplierId: number;

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
    name,
    path,
    supplierId,
    updatedBy,
    createdBy,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    path: string;
    supplierId: number;
    updatedBy: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.supplierId = supplierId;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}
