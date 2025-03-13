import { IsString, IsEmail, IsNotEmpty, IsOptional, IsInt, Min, Max, Length } from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    @Length(6, 50)
    password?: string;
  
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsString()
    @IsOptional()
    address?: string;
  
    @IsString()
    @IsOptional()
    phone?: string;
  
    @IsInt()
    @Min(1)
    @Max(120)
    @IsOptional()
    age?: number;
  }