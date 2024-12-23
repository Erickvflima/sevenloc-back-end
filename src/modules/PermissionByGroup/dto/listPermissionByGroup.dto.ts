import { DefaultDto } from '@modules/common/dto/default.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ListPermissionByGroupDTO extends DefaultDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  readonly permissionId: number;

  @ApiProperty({ example: 30 })
  @IsInt()
  readonly groupId: number;

  @ApiProperty({ example: 'Parceiro' })
  @IsString()
  readonly groupName: string;

  @ApiProperty({ example: 'Login' })
  @IsString()
  readonly permissionName: string;

  constructor({
    id,
    permissionId,
    groupId,
    groupName,
    permissionName,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
  }: {
    id: number;
    permissionId: number;
    groupId: number;
    groupName: string;
    permissionName: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super({ createdAt, createdBy, updatedAt, updatedBy, id });
    this.permissionId = permissionId;
    this.groupId = groupId;
    this.groupName = groupName;
    this.permissionName = permissionName;
  }
}
