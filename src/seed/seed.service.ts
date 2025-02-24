import { Injectable } from '@nestjs/common';
import { getDataProducts } from './scrapping';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../products/entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async fillData() {
    await this.productModel.deleteMany({});

    const promises = [];
    const finalPage = 5;

    for (let page = 1; page <= finalPage; page++) {
      promises.push(getDataProducts(page));
    }

    const data = await Promise.all(promises);

    await this.productModel.insertMany(data.flat());

    return 'Datos guardados correctamente';
  }
}
