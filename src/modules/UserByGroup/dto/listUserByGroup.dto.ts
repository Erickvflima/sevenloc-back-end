import { DefaultDto } from '@modules/common/dto/default.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ListUserByGroupDTO extends DefaultDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  readonly userId: number;

  @ApiProperty({ example: 30 })
  @IsInt()
  readonly groupId: number;

  @ApiProperty({ example: 'Parceiro' })
  @IsString()
  readonly groupName: string;

  @ApiProperty({ example: 'Parceiro' })
  @IsString()
  readonly userEmail: string;

  constructor({
    id,
    userId,
    groupId,
    groupName,
    userEmail,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
  }: {
    id: number;
    userId: number;
    groupId: number;
    groupName: string;
    userEmail: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super({ createdAt, createdBy, updatedAt, updatedBy, id });
    this.userId = userId;
    this.groupId = groupId;
    this.groupName = groupName;
    this.userEmail = userEmail;
  }
}
