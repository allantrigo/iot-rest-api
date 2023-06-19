import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../entity/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceEntityRepository: Repository<Device>,
  ) {}

  async edit(device: Device) {
    const editedDevice = await this.deviceEntityRepository.save(device);
    return editedDevice;
  }

  async delete(device: Device) {
    const deletedDevice = await this.deviceEntityRepository.remove(device);
    return deletedDevice;
  }

  async findById(id: string) {
    return await this.deviceEntityRepository.findOne({
      relations: ['ownerships', 'ownerships.user'],
      where: { id: id },
    });
  }
}
