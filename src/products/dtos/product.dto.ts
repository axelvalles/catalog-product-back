import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly sku: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly tags: string[];
}

export class UpdateProductDto extends PickType(CreateProductDto, [
  'name',
  'description',
  'image',
  'tags',
] as const) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @Min(0)
  readonly page: number;

  @IsOptional()
  readonly search: string;

  @IsOptional()
  @Min(0)
  readonly minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  readonly maxPrice: number;
}

export class ChangePriceDto {
  @IsNotEmpty()
  @IsPositive()
  readonly newPrice: number;
}

export class ChangeStockDto {
  @IsNotEmpty()
  @IsPositive()
  readonly newStock: number;
}
