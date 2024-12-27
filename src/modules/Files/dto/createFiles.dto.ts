import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFilesDTO {
  @ApiProperty({
    example: 1,
    description: 'ID do fornecedor associado ao arquivo',
  })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  supplierId: number;
}
