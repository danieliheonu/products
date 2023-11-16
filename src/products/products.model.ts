import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// export const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   price: {
//     type: Number,
//     required: true,
//   },
// });

export type ProductDocument = HydratedDocument<IProduct>;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;
}

export const productSchema = SchemaFactory.createForClass(Product);

export interface IProduct {
  name: string;
  description: string;
  price: number;
}
