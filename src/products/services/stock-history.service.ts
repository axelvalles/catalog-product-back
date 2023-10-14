import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StockHistory } from '../entities/stock-history.entity';
import { Model } from 'mongoose';

@Injectable()
export class StockHistoryService {
  constructor(
    @InjectModel(StockHistory.name)
    private stockHistoryModel: Model<StockHistory>,
  ) {}

  async findAll(id: string) {
    const priceHistory = await this.stockHistoryModel
      .find({ product: id })
      .exec();

    return priceHistory;
  }

  addRecord(id: string, newStock: number, oldStock: number) {
    const newRecord = new this.stockHistoryModel({
      newStock: newStock,
      oldStock: oldStock,
      product: id,
    });

    return newRecord.save();
  }
}
