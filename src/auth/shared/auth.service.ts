import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncrypterService } from 'src/encrypter/shared/encrypter.service';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/shared/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encryptService: EncrypterService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findByEmail(userEmail);
    user.password = this.encryptService.decrypt(user.password);
    if (user && user.password === userPassword) {
      const { id, firstName, email } = user;
      return { id, firstName, email };
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
