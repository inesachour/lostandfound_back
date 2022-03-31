import { Body, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
      date: createPublicationDto.date,
      dateCreation: Date(),
      location: createPublicationDto.location,
      images: createPublicationDto.images,
      user: createPublicationDto.user,
    });
    const result = await newPublication.save();
    return result.id;
  }
}
