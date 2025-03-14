/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  newPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  confirmPassword: string;
}
