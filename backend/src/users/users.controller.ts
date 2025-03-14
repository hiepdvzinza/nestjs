/* eslint-disable prettier/prettier */
import { 
  Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { status: 'success', message: 'User created successfully', data: user };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return { status: 'success', message: 'Users fetched successfully', data: users };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return { status: 'success', message: 'User fetched successfully', data: user };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) throw new NotFoundException('User not found');
    return { status: 'success', message: 'User updated successfully', data: user };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return { status: 'success', message: 'User deleted successfully' };
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await this.usersService.resetPassword(resetPasswordDto);
    return { status: 'success', message: result.message };
  }
}
