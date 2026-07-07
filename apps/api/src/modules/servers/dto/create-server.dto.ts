import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateServerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  description?: string;
}