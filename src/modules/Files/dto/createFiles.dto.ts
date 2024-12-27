import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFilesDTO {
  @ApiProperty({ example: 'contrato.pdf' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  supplierId: number;
}
