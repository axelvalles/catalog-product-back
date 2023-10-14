import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PriceHistory } from '../entities/price-history.entity';
import { Model } from 'mongoose';

@Injectable()
export class PricesHistoryService {
  constructor(
    @InjectModel(PriceHistory.name)
    private priceHistoryModel: Model<PriceHistory>,
  ) {}

  async findAll(id: string) {
    const priceHistory = await this.priceHistoryModel
      .find({ product: id })
      .exec();

    return priceHistory;
  }

  addRecord(id: string, newPrice: number, oldPrice: number) {
    const newRecord = new this.priceHistoryModel({
      newPrice: newPrice,
      oldPrice: oldPrice,
      product: id,
    });

    return newRecord.save();
  }
}
