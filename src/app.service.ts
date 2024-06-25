import { Injectable } from '@nestjs/common';
import { Cat, CatDocument } from './cat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {

  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createCat(cat: Cat): Promise<Cat> {
    const createdCat = new this.catModel(cat);
    return createdCat.save();
  }
}
