import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publication } from './model/publication';
import { PublicationSearchDto } from './dto/publication-search-dto';
import { Model } from 'mongoose';

@Injectable()
export class PublicationService {
  constructor(
    @InjectModel('Publication')
    private readonly publicationModel: Model<Publication>,
  ) {}

  async insertPublication(title: string, description: string) {
    const newPub = new this.publicationModel({
      title,
      description,
    });
    const result = await newPub.save();
    return result.id as string;
  }

  async getPubs() {
    const pubs = await this.publicationModel.find().exec();
    return pubs;
  }

  async getPubsSearched(publicationSearchDto: PublicationSearchDto) {
    const { search } = publicationSearchDto;
    let options = {};
    options = {
      $or: [
        { title: new RegExp(search.toString(), 'i') },
        { description: new RegExp(search.toString(), 'i') },
      ],
    };
    const pubs = await this.publicationModel.find(options).exec();
    return pubs;
  }
}
