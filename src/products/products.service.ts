import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from './products.model';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<IProduct>,
  ) {}

  async addProduct(
    body: CreateProductDto,
  ): Promise<IProduct & { _id: Types.ObjectId }> {
    return await this.productModel.create(body);
  }

  async getProducts(): Promise<(IProduct & { _id: Types.ObjectId })[]> {
    return await this.productModel.find();
  }

  async getProduct(id: string): Promise<IProduct & { _id: Types.ObjectId }> {
    const product = await this.getProductById(id);
    return product;
  }

  async updateProduct(
    id: string,
    body: UpdateProductDto,
  ): Promise<IProduct & { _id: Types.ObjectId }> {
    const product = await this.getProductById(id);
    if (!product) throw new NotFoundException('product not found');

    return await this.productModel.findByIdAndUpdate(id, body, { new: true });
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('product not found');
  }

  private async getProductById(
    id: string,
  ): Promise<IProduct & { _id: Types.ObjectId }> {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('product not found');

    return product;
  }
}
