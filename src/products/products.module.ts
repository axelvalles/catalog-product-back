import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import {
  PriceHistory,
  PriceHistorySchema,
} from './entities/price-history.entity';
import {
  StockHistory,
  StockHistorySchema,
} from './entities/stock-history.entity';
import { ProductsService } from './services/products.service';
import { PricesHistoryService } from './services/prices-history.service';
import { StockHistoryService } from './services/stock-history.service';
import { ProductsController } from './controllers/products.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: PriceHistory.name,
        schema: PriceHistorySchema,
      },
      {
        name: StockHistory.name,
        schema: StockHistorySchema,
      },
    ]),
  ],
  providers: [ProductsService, PricesHistoryService, StockHistoryService],
  controllers: [ProductsController],
})
export class ProductsModule {}
