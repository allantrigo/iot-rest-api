import { UserModule } from '../user/user.module';
import { DeviceModule } from '../device/device.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './shared/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OwnershipModule } from 'src/ownership/ownership.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: 'postgres',
        host: `${process.env.DB_HOST}`,
        port: Number.parseInt(`${process.env.DB_PORT}`),
        username: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        database: `${process.env.DB_NAME}`,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UserModule,
    DeviceModule,
    OwnershipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
