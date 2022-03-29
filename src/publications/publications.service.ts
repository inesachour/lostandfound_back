import { Body, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create_publication.dto';

@Injectable()
export class PublicationsService {

  async addPublication(createPublicationDto: CreatePublicationDto) {
    return createPublicationDto.title;
  }
}
