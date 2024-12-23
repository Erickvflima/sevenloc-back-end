import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLogDTO {
  @IsString()
  @IsNotEmpty()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  route: string;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsString()
  @IsNotEmpty()
  className: string;

  @IsString()
  @IsNotEmpty()
  params: string;

  @IsString()
  @IsNotEmpty()
  errorMessage: string;

  @IsString()
  @IsNotEmpty()
  updatedBy: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
