export class CreatePublicationDto {
  title: string;
  description: string;
  date: Date;
  category: string;
  location: Location;
  images: [];
  owner: string;
  status = 'perdu ou trouvé';
}
