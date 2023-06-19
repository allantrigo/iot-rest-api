import {
  Body,
  Controller,
  Post,
  Patch,
  Delete,
  UseGuards,
  UsePipes,
  NotFoundException,
  UnauthorizedException,
  Param,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { DeviceValidator } from 'src/validator/shared/device.validator';
import { Device } from './entity/device.entity';
import { UserService } from 'src/user/shared/user.service';
import { OwnershipService } from 'src/ownership/shared/ownership.service';
import { JoiValidationPipe } from 'src/validator/joi.pipe';
import { TokenDecorator } from 'src/decorator/token.decorator';
import { Ownership, OwnershipTypes } from 'src/ownership/entity/ownership';
import { DeviceService } from './shared/device.service';

@UseGuards(JwtAuthGuard)
@Controller('device')
export class DeviceController {
  constructor(
    private ownershipService: OwnershipService,
    private deviceService: DeviceService,
    private userService: UserService,
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe(new DeviceValidator().create()))
  async create(
    @Body() device: Device,
    @TokenDecorator() jwtUserId: string,
  ): Promise<Device> {
    const user = await this.userService.findById(jwtUserId);
    const ownership = new Ownership(user, device);
    const createdDevice = (await this.ownershipService.create(ownership))
      .device;
    return createdDevice;
  }

  @UsePipes(new JoiValidationPipe(new DeviceValidator().edit()))
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async edit(
    @Param('id') deviceId: string,
    @Body() device: Device,
    @TokenDecorator() jwtUserId: string,
  ): Promise<Device> {
    const ownership = await this.ownershipService.findByUserAndId(
      jwtUserId,
      deviceId,
    );
    if (ownership) {
      if (
        ownership.ownership == OwnershipTypes.OWNER ||
        ownership.ownership == OwnershipTypes.EDITOR
      ) {
        if (device.name && device.name.trim())
          ownership.device.name = device.name;
        if (device.local && device.local.trim())
          ownership.device.local = device.local;
        if (device.type && device.type.trim())
          ownership.device.type = device.type;
        return await this.deviceService.edit(ownership.device);
      }
      throw new UnauthorizedException();
    }
    throw new NotFoundException();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @TokenDecorator() jwtUserId: string,
    @Param('id') deviceId: string,
  ): Promise<Device> {
    const ownership = await this.ownershipService.findByUserAndId(
      jwtUserId,
      deviceId,
    );
    if (ownership) {
      if (ownership.ownership == OwnershipTypes.OWNER) {
        const device = ownership.device;
        return await this.deviceService.delete(device);
      }
      throw new UnauthorizedException();
    }
    throw new NotFoundException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') deviceId: string): Promise<Device> {
    const device = await this.deviceService.findById(deviceId);
    if (device) {
      return device;
    }
    throw new NotFoundException();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findByUser(@TokenDecorator() jwtUserId: string): Promise<Ownership[]> {
    const ownerships = await this.ownershipService.findByUser(jwtUserId);
    if (ownerships) {
      return ownerships;
    }
    throw new NotFoundException();
  }
}
