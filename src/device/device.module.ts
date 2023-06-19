import { Module } from '@nestjs/common';
import { Device } from './entity/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from './device.controller';
import { UserModule } from 'src/user/user.module';
import { DeviceService } from './shared/device.service';
import { OwnershipModule } from 'src/ownership/ownership.module';

@Module({
  imports: [TypeOrmModule.forFeature([Device]), UserModule, OwnershipModule],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
