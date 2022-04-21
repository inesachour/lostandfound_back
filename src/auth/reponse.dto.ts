// success: true => message, data
// success: false => errorMessage, error
import { IResponse } from './interfaces/reponse.interface';

export class ResponseError implements IResponse {
  constructor(infoMessage: string) {
    this.success = false;
    this.message = infoMessage;
  }
  message: string;
  success: boolean;
}

export class ResponseSuccess implements IResponse {
  constructor(infoMessage: string) {
    this.success = true;
    this.message = infoMessage;
  }
  message: string;
  success: boolean;
}
