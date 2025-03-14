/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsInt, Min, Max, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  address?: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(120)
  age: number;
}

