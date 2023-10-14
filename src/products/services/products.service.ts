import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Product } from '../entities/product.entity';
import { FilterQuery, Model } from 'mongoose';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { PricesHistoryService } from './prices-history.service';
import { StockHistoryService } from './stock-history.service';
import * as mongoose from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private pricesHistoryService: PricesHistoryService,
    private stockHistoryService: StockHistoryService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async findAll(params: FilterProductsDto) {
    const { page = 1, limit = 10, minPrice, maxPrice, search } = params;

    const skip = (page - 1) * limit;

    const filters: FilterQuery<Product> = {};

    if (minPrice) {
      filters.price = { $gte: minPrice };
    }
    if (maxPrice) {
      filters.price = { $lte: maxPrice };
    }
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const totalProducts = await this.productModel
      .countDocuments(filters)
      .exec();

    const products = await this.productModel
      .find(filters)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalPages = Math.ceil(totalProducts / limit);

    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return { data: products, hasNextPage, hasPrevPage, total: totalProducts };
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  async update(id: string, changes: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  async changePrice(id: string, newPrice: number) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const product = await this.findById(id);
      await this.pricesHistoryService.addRecord(id, newPrice, product.price);

      product.price = newPrice;
      const newProduct = await product.save();

      await session.commitTransaction();
      session.endSession();

      return newProduct;
    } catch (error) {
      console.log(error);

      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async changeStock(id: string, newStock: number) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const product = await this.findById(id);
      await this.stockHistoryService.addRecord(id, newStock, product.stock);

      product.stock = newStock;
      const newProduct = await product.save();

      await session.commitTransaction();
      session.endSession();

      return newProduct;
    } catch (error) {
      console.log(error);

      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
