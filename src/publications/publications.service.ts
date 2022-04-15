import { Body, Inject, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create_publication.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publication } from './publications.model';
import { Model } from 'mongoose';
import { PublicationSearchDto } from '../publications/dto/publication-search-dto';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel('Publication')
    private readonly publicationModel: Model<Publication>,
  ) {}

  async addPublication(createPublicationDto: CreatePublicationDto) {
    //console.log(JSON.parse(createPublicationDto.owner));
    const newPublication = new this.publicationModel({
      title: createPublicationDto.title,
      description: createPublicationDto.description,
      date: new Date(createPublicationDto.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      tempsCreation: new Date(createPublicationDto.tempsCreation).toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      location: JSON.parse(createPublicationDto.location),
      images: JSON.parse(createPublicationDto.images),
      owner: JSON.parse(createPublicationDto.owner),
      category: createPublicationDto.category,
      type: createPublicationDto.type,
      status: createPublicationDto.status,
    });
   // console.log(newPublication);
    const result = await newPublication.save();
    return result.id;
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
        { category: new RegExp(search.toString(), 'i') },
      ],
    };
    const pubs = await this.publicationModel.find(options).exec();
    return pubs;
  }
}
