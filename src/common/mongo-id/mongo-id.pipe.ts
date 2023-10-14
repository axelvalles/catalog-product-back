import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: any) {
    if (!isMongoId(value)) {
      throw new NotFoundException(`${value} is not mongo id`);
    }
    return value;
  }
}
