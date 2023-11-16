import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { Response } from 'express';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async addProduct(@Body() body: CreateProductDto, @Res() res: Response) {
    const data = await this.productService.addProduct(body);
    res.status(HttpStatus.CREATED).json({
      message: 'product added successfully',
      data,
    });
  }

  @Get()
  async getProducts(@Res() res: Response) {
    const data = await this.productService.getProducts();
    res.status(HttpStatus.OK).json({
      message: 'products fetched successfully',
      data,
    });
  }

  @Get(':id')
  async getProduct(@Param('id') id: string, @Res() res: Response) {
    const data = await this.productService.getProduct(id);
    res.status(HttpStatus.OK).json({
      message: 'product fetched successfully',
      data,
    });
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
    @Res() res: Response,
  ) {
    const data = await this.productService.updateProduct(id, body);
    res.status(HttpStatus.OK).json({
      message: 'product updated successfully',
      data,
    });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Res() res: Response) {
    await this.productService.deleteProduct(id);
    res.status(HttpStatus.OK).json({
      message: 'product deleted successfully',
    });
  }
}
