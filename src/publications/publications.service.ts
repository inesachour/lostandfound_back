import { Body, Inject, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create_publication.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publication } from './publications.model';
import { Model } from 'mongoose';
import { PublicationSearchDto } from '../publications/dto/publication-search-dto';
import { FilterPublicationDto } from './dto/filter_publication.dto';
import { HttpService } from '@nestjs/axios';
import { UpdatePubDto } from './dto/update_pub_dto';

@Injectable()
export class PublicationsService {

  constructor(
    @InjectModel('Publication')
    private readonly publicationModel: Model<Publication>,
    private httpService: HttpService
  ) { }


  async deletePub (idPub: string) {
    await this.httpService.axiosRef.delete(`http://localhost:3000/comments/publication/${idPub}`).then(
      async () => {
        await this.publicationModel.deleteOne({
          _id : idPub
        });
        console.log("deleted successfully");
      }
    );
  }


  async addPublication(createPublicationDto: CreatePublicationDto) {
    //console.log(JSON.parse(createPublicationDto.owner));
    console.log("owner ",createPublicationDto.owner);

    const newPublication = new this.publicationModel({
      title: createPublicationDto.title,
      description: createPublicationDto.description,
      date: new Date(createPublicationDto.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      tempsCreation: new Date(
        createPublicationDto.tempsCreation,
      ).toLocaleDateString(undefined, {
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


  async updatePub(idPub:string,updatePub : UpdatePubDto){
    const result = await this.publicationModel.findByIdAndUpdate(idPub,updatePub)
    return result;
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

  async filterPublication(filterPublicationDto: FilterPublicationDto) {
    const categories = [];

    const firstDateTable =
      filterPublicationDto.firstDate != ''
        ? new Date(filterPublicationDto.firstDate)
            .toLocaleDateString(undefined, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .split('/')
        : '';

    const firstDate = firstDateTable[2] + firstDateTable[1] + firstDateTable[0];

    const secondDateTable =
      filterPublicationDto.secondDate != ''
        ? new Date(filterPublicationDto.secondDate)
            .toLocaleDateString(undefined, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .split('/')
        : '';

    const secondDate =
      secondDateTable[2] + secondDateTable[1] + secondDateTable[0];

    JSON.parse(filterPublicationDto.categories).forEach((e) => {
      categories.push({ category: e });
    });

    const filter = {
      $and: [
        { type: filterPublicationDto.type.toLowerCase() },
        categories.length > 0 ? { $or: categories } : {},
        // filterPublicationDto.longitude != "" ? {location : }: {}
      ],
    };

    const pubs = await this.publicationModel.find(filter).exec();
    let filteredpubs = [];

    if (
      filterPublicationDto.secondDate != '' &&
      filterPublicationDto.firstDate != ''
    ) {
      pubs.forEach((pub) => {
        const dateTable = pub.date.toString().split('/');
        const date = dateTable[2] + dateTable[1] + dateTable[0];

        if (date >= firstDate && date <= secondDate) {
          filteredpubs.push(pub);
        }
      });
    } else {
      filteredpubs = pubs;
    }
    //console.log(JSON.parse(filterPublicationDto.location).coordinates[0]);
    if (filterPublicationDto.location != '') {
      const pubsaux = [];
      pubs.forEach((element) => {
        if (
          element.location['coordinates'][0] >=
            JSON.parse(filterPublicationDto.location).coordinates[0] - 0.5 &&
          element.location['coordinates'][0] <=
            JSON.parse(filterPublicationDto.location).coordinates[0] + 0.5 &&
          element.location['coordinates'][1] >=
            JSON.parse(filterPublicationDto.location).coordinates[1] - 0.5 &&
          element.location['coordinates'][1] <=
            JSON.parse(filterPublicationDto.location).coordinates[1] + 0.5
        ) {
          pubsaux.push(element);
        }
        filteredpubs = pubsaux;
      });
    }
    return filteredpubs;
  }
  async getMyPubs(idUser: string) {
    let pubs = [];
    (await this.getPubs()).forEach(element => {
      if (element.owner._id == idUser)
        pubs.push(element)
    });
    return pubs;
  }


  async deletePubsByUserId(id: string){
    const result = await this.publicationModel.deleteMany({ owner: id });
    return result;
  }

}
