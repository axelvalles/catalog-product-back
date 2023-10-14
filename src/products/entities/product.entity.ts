import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ unique: true, required: true, type: String })
  sku: string;

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number })
  stock: number;

  @Prop({ required: true })
  tags: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
