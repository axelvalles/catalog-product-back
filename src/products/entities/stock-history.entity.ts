import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from './product.entity';

export type StockHistoryDocument = HydratedDocument<StockHistory>;

@Schema()
export class StockHistory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ required: true })
  newStock: number;

  @Prop({ required: true })
  oldStock: number;
}

export const StockHistorySchema = SchemaFactory.createForClass(StockHistory);
