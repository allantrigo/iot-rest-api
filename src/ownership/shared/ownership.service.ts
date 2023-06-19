/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { Ownership } from '../entity/ownership';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class OwnershipService {
  constructor(
    @InjectRepository(Ownership)
    private readonly ownershipEntityRepository: Repository<Ownership>,
  ) {}

  async create(ownership: Ownership) {
    try {
      const registeredOwnership = await this.ownershipEntityRepository.save(
        ownership,
      );
      return registeredOwnership;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async edit(ownership: Ownership) {
    const editedOwnership = await this.ownershipEntityRepository.save(
      ownership,
    );
    return editedOwnership;
  }

  async delete(ownership: Ownership) {
    const deletedOwnership = await this.ownershipEntityRepository.remove(
      ownership,
    );
    return deletedOwnership;
  }

  async fetchByUser(user: User) {
    return await this.ownershipEntityRepository.findBy({ user: user });
  }

  async findById(id: string) {
    return await this.ownershipEntityRepository.findOne({
      where: { id: id },
      relations: ['device', 'user'],
    });
  }

  async findByUserAndId(userId: string, deviceId: string) {
    return await this.ownershipEntityRepository
      .createQueryBuilder('ownership')
      .leftJoinAndSelect('ownership.device', 'device')
      .where('ownership.userId = :userId AND ownership.deviceId = :deviceId', {
        userId: userId,
        deviceId: deviceId,
      })
      .getOne();
  }

  async findByUser(userId: string) {
    return await this.ownershipEntityRepository
      .createQueryBuilder('ownership')
      .leftJoinAndSelect('ownership.device', 'device')
      .where('ownership.userId = :userId', { userId: userId })
      .getMany();
  }

  async findByDevice(deviceId: string) {
    return await this.ownershipEntityRepository
      .createQueryBuilder('ownership')
      .leftJoinAndSelect('ownership.user', 'user')
      .where('ownership.deviceId = :deviceId', { deviceId: deviceId })
      .getMany();
  }
}
