import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async register(user: User) {
    try {
      const registeredUser: User = await this.userEntityRepository.save(user);
      return registeredUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async edit(user: User) {
    const editedUser: User = await this.userEntityRepository.save(user);
    return editedUser;
  }

  async delete(user: User) {
    const deletedUser = await this.userEntityRepository.remove(user);
    return deletedUser;
  }

  async findById(id: string) {
    return await this.userEntityRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string) {
    return await this.userEntityRepository.findOneBy({ email: email });
  }
}
