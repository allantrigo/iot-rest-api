import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
  UsePipes,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './shared/user.service';
import { User } from './entity/user.entity';
import { EncrypterService } from 'src/encrypter/shared/encrypter.service';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { TokenDecorator } from 'src/decorator/token.decorator';
import { JoiValidationPipe } from 'src/validator/joi.pipe';
import { UserValidator } from 'src/validator/shared/user.validator';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private encryptService: EncrypterService,
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe(new UserValidator().register()))
  async register(@Body() user: User): Promise<User> {
    user.password = this.encryptService.encrypt(user.password);
    return await this.userService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(new UserValidator().findByEmail()))
  @Get()
  async findByEmail(@Body() user: User): Promise<User> {
    const userToFind = await this.userService.findByEmail(user.email);
    if (userToFind) {
      return userToFind;
    }
    throw new NotFoundException();
  }

  @UsePipes(new JoiValidationPipe(new UserValidator().edit()))
  @UseGuards(JwtAuthGuard)
  @Patch()
  async edit(@Body() user: User, @TokenDecorator() id: string): Promise<User> {
    const userToUpdate = await this.userService.findById(id);
    if (userToUpdate) {
      if (user.firstName && user.firstName.trim())
        userToUpdate.firstName = user.firstName;
      if (user.lastName && user.lastName.trim())
        userToUpdate.lastName = user.lastName;
      if (user.email && user.email.trim()) userToUpdate.email = user.email;
      return await this.userService.edit(userToUpdate);
    }
    throw new NotFoundException();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(new UserValidator().changePassword()))
  @Patch('change-password')
  async changePassword(
    @TokenDecorator() id: string,
    @Body() body: any,
  ): Promise<User> {
    const userToUpdate = await this.userService.findById(id);
    if (userToUpdate) {
      userToUpdate.password = this.encryptService.decrypt(
        userToUpdate.password,
      );
      if (userToUpdate.password === body.actualPassword) {
        userToUpdate.password = this.encryptService.encrypt(body.password);
        return await this.userService.edit(userToUpdate);
      }
      throw new UnauthorizedException();
    }
    throw new NotFoundException();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(new UserValidator().delete()))
  @Delete()
  async delete(@TokenDecorator() id: string, @Body() body: any): Promise<User> {
    const user = await this.userService.findById(id);
    if (user) {
      user.password = this.encryptService.decrypt(user.password);
      if (user.password === body.password) {
        return await this.userService.delete(user);
      }
      throw new UnauthorizedException();
    }
    throw new NotFoundException();
  }
}
