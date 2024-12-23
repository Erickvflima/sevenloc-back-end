import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class ListUserDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'active' })
  @IsString()
  readonly status: string;

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
    email,
    status,
    updatedBy,
    createdBy,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    email: string;
    status: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}
