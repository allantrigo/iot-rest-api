/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EncrypterService } from './shared/encrypter.service';

@Module({
  providers: [EncrypterService],
  exports: [EncrypterService],
})
export class EncrypterModule {}
