import { Module } from '@nestjs/common';
import { OwnershipService as OwnershipService } from './shared/ownership.service';
import { Ownership as Ownership } from './entity/ownership';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ownership])],
  providers: [OwnershipService],
  exports: [OwnershipService],
})
export class OwnershipModule {}
