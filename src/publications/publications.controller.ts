import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create_publication.dto';
import { PublicationSearchDto } from '../publications/dto/publication-search-dto';
import { Publication } from './publications.model';
import { FilterPublicationDto } from './dto/filter_publication.dto';

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

  @Get()
  async getSearch(@Query() publicationSearchDto: PublicationSearchDto) {
    let pubs = [];
    if (Object.keys(publicationSearchDto).length) {
      pubs = await this.publicationsService.getPubsSearched(
        publicationSearchDto,
      );
    } else {
      pubs = await this.publicationsService.getPubs();
    }
    //console.log(pubs);
    return pubs as Publication[];
  }

  @Post("/filter")
  async filter(@Body() filterPublicationDto : FilterPublicationDto){
    
    console.log("ok");
    
    let pubs = await this.publicationsService.filterPublication(filterPublicationDto);

    return pubs
    
  }
}
