/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'custom' && metadata.data !== 'id') {
      const { error } = this.schema.validate({ ...value });
      if (error) {
        throw new BadRequestException(error.message);
      }
      return value;
    }
    return value;
  }
}
