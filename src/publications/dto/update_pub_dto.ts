import { PickType } from "@nestjs/mapped-types";
import { CreatePublicationDto } from "./create_publication.dto";

export class UpdatePubDto extends PickType(CreatePublicationDto, ["title","description"]){}