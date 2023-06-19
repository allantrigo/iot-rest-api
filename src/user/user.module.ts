import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './shared/user.service';
import { UserController } from './user.controller';
import { EncrypterModule } from 'src/encrypter/encrypter.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EncrypterModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
