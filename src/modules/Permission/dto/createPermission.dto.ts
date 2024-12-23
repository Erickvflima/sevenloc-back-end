import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDTO {
  @ApiProperty({ example: 'Login' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Logar no portal' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
