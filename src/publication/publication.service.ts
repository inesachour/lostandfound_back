import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publication } from './publication';
import { PublicationSearchDto } from './dto/publication-search-dto';
import { Model } from 'mongoose';

@Injectable()
export class PublicationService {
  constructor(
    @InjectModel('Publication')
    private readonly publicationModel: Model<Publication>,
  ) {}

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
        { category: new RegExp(search.toString(), 'i') },
      ],
    };
    const pubs = await this.publicationModel.find(options).exec();
    return pubs;
  }
}
