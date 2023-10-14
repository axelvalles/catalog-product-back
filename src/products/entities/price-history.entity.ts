import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from './product.entity';

export type PriceHistoryDocument = HydratedDocument<PriceHistory>;

@Schema()
export class PriceHistory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ required: true })
  newPrice: number;

  @Prop({ required: true })
  oldPrice: number;
}

export const PriceHistorySchema = SchemaFactory.createForClass(PriceHistory);
