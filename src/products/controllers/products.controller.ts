import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import {
  ChangePriceDto,
  ChangeStockDto,
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { PricesHistoryService } from '../services/prices-history.service';
import { StockHistoryService } from '../services/stock-history.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private priceHistoryService: PricesHistoryService,
    private stockHistoryService: StockHistoryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List of products with filters paginated ' })
  async getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Get('price-history/:id')
  @ApiOperation({ summary: 'Get product prices history by id' })
  getPriceHistory(@Param('id', MongoIdPipe) id: string) {
    return this.priceHistoryService.findAll(id);
  }

  @Get('stock-history/:id')
  @ApiOperation({ summary: 'Get product stock history by id' })
  getStockHistory(@Param('id', MongoIdPipe) id: string) {
    return this.stockHistoryService.findAll(id);
  }

  @Post('change-price/:id')
  @ApiOperation({ summary: 'Change product price' })
  changePrice(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: ChangePriceDto,
  ) {
    return this.productsService.changePrice(id, payload.newPrice);
  }

  @Post('change-stock/:id')
  @ApiOperation({ summary: 'Change product stock' })
  changeStock(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: ChangeStockDto,
  ) {
    return this.productsService.changeStock(id, payload.newStock);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Product' })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
