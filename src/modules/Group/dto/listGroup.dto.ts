import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString } from 'class-validator';

export class ListGroupDTO {
  @ApiProperty({ example: 1 })
  @IsInt()
  readonly id: number;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  readonly name: string;
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
    updatedBy,
    createdBy,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    updatedBy: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}
