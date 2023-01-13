import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class IsMongodbObjectIdPipe implements PipeTransform {
  transform(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('Incorrect id provided.');

    return id;
  }
}
