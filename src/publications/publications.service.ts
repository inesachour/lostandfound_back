import { Body, Inject, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create_publication.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publication } from './publications.model';
import { Model } from 'mongoose';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel('Publication')
    private readonly publicationModel: Model<Publication>,
  ) {}

  async addPublication(createPublicationDto: CreatePublicationDto) {
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
      location: createPublicationDto.location,
      images: createPublicationDto.images,
      owner: createPublicationDto.owner,
      category: createPublicationDto.category,
      type: createPublicationDto.type,
      status: createPublicationDto.status,
    });
    console.log(newPublication);
    const result = await newPublication.save();
    return result.id;
  }
}
