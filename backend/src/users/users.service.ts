/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly dataSource: DataSource) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const result = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        ...createUserDto,
        password: hashedPassword,
      })
      .execute();
    return result.raw[0] as User;
  }

  async findAll(): Promise<User[]> {
    return this.dataSource
      .getRepository(User) 
      .createQueryBuilder('user')
      .select()
      .getMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .select()
      .where('user.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    if ('password' in updateUserDto) delete updateUserDto.password;

    await this.dataSource.createQueryBuilder().update(User).set(updateUserDto).where('id = :id', { id }).execute();
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.dataSource.createQueryBuilder().delete().from(User).where('id = :id', { id }).execute();
    if (result.affected === 0) throw new NotFoundException('User not found');
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    if (resetPasswordDto.newPassword !== resetPasswordDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.findOneByEmail(resetPasswordDto.email);
    if (!user) throw new NotFoundException('User not found');

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);

    await this.dataSource.createQueryBuilder().update(User).set({ password: hashedPassword }).where('email = :email', { email: resetPasswordDto.email }).execute();

    return { message: 'Password reset successfully' };
  }

  private async findOneByEmail(email: string): Promise<User | null> {
    return this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .select()
      .where('user.email = :email', { email })
      .getOne();
  }
}
