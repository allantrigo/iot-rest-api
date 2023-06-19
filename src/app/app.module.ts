import { UserModule } from '../user/user.module';
import { DeviceModule } from '../device/device.module';
import { DeviceService } from '../device/shared/device.service';
import { UserService } from '../user/shared/user.service';
import { UserController } from '../user/user.controller';
import { DeviceController } from '../device/device.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './shared/app.service';

@Module({
  imports: [UserModule, DeviceModule],
  controllers: [UserController, DeviceController, AppController],
  providers: [DeviceService, UserService, AppService],
})
export class AppModule {}
