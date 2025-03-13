import { IsString, IsEmail, IsNotEmpty, IsOptional, IsInt, Min, Max, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 50) 
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsInt()
  @Min(1)
  @Max(120)
  age: number;
}

