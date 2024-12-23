import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class DefaultDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  readonly id: number;

  @ApiProperty({ example: '2024-09-04T12:00:00Z' })
  @IsDateString()
  readonly createdAt: Date;

  @ApiProperty({ example: '2024-09-04T12:00:00Z' })
  @IsDateString()
  readonly updatedAt: Date;

  @ApiProperty({ example: 'teste@teste.com' })
  @IsString()
  readonly createdBy: string;

  @ApiProperty({ example: 'teste@teste.com' })
  @IsString()
  readonly updatedBy: string;

  constructor({
    id,
    updatedBy,
    createdBy,
    createdAt,
    updatedAt,
  }: {
    id: number;
    updatedBy: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}
