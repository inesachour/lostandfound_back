import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create_publication.dto';
import { PublicationSearchDto } from '../publications/dto/publication-search-dto';
import { Publication } from './publications.model';
import { UpdatePubDto } from './dto/update_pub_dto';

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

  @Get("/:idUser")
  async getMyPubs(@Param('idUser') idUser: string) {
    let pubs =[];
    pubs = await this.publicationsService.getMyPubs(idUser);
    return pubs ; 
  }
  @Delete("/:idPub")
  async deletePub (@Param("idPub") idPub: string) {
    return this.publicationsService.deletePub(idPub);
  }

  @Patch("/:idPub")
  async  updatePub(@Param("idPub") id: string,@Body() updatePub : UpdatePubDto ) {
    this.publicationsService.updatePub(id,updatePub);
  }
}
