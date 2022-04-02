import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationSearchDto } from './dto/publication-search-dto';
import { Publication } from './publication';

@Controller('api/publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  async getSearch(@Query() publicationSearchDto: PublicationSearchDto) {
    let pubs = [];
    if (Object.keys(publicationSearchDto).length) {
      pubs = await this.publicationService.getPubsSearched(
        publicationSearchDto,
      );
    } else {
      pubs = await this.publicationService.getPubs();
    }
    console.log(pubs);
    return pubs as Publication[];
  }

  //@Get()
  //async getAllPubs() {
  //const pubs = await this.publicationService.getPubs();
  //return pubs as Publication[];
  //}
}
