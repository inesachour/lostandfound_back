import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create_publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    const newPublication = await this.publicationsService.addPublication(
      createPublicationDto,
    );
    return newPublication;
  }
}
