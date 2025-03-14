import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    if (user) {
      const isCheck = this.usersService.isValidPassWord(pass, user?.password);
      if (isCheck) {
        return user;
      }
    }
    return null;
  }
}
