import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationSearchDto } from './dto/publication-search-dto';
import { Publication } from './model/publication';

@Controller('api/publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  async addPub(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const generatedId = await this.publicationService.insertPublication(
      title,
      description,
    );
    return { id: generatedId };
  }

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
