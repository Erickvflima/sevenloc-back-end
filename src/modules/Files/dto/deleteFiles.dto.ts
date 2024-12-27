import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteFilespDTO {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  supplierId: string;
}
