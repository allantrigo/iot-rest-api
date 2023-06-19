import { TypeOrmModule } from '@nestjs/typeorm';
import { Ownership } from './entity/ownership.entity';
import { OwnershipController } from './ownership.controller';
import { OwnershipService } from './shared/ownership.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ownership]), UserModule],
  controllers: [OwnershipController],
  providers: [OwnershipService],
  exports: [OwnershipService],
})
export class OwnershipModule {}
