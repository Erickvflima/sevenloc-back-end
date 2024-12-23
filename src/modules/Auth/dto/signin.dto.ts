import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDTO {
  @ApiProperty({ example: 'teste@teste.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'sha256' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
