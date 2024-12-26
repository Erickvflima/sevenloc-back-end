import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateSupplierDTO {
  @ApiProperty({ example: 'Fornecedor Um' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  @ApiProperty({ example: '17855568000197' })
  @IsString()
  @Length(14, 14)
  cnpj: string;

  @ApiProperty({ example: '9629741683' })
  @IsString()
  @Length(10, 15)
  phone: string;

  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
