import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLinkPermissionByGroupDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  permissionId: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsNotEmpty()
  groupId: number;
}
