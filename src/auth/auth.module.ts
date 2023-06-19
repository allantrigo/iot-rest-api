import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './shared/local.strategy';
import { JwtStrategy } from './shared/jwt.strategy';
import { AuthService } from './shared/auth.service';
import { UserModule } from 'src/user/user.module';
import { EncrypterModule } from 'src/encrypter/encrypter.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    EncrypterModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: `${process.env.JWTTOKEN}`,
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
