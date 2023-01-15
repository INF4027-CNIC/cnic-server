import { HttpException, HttpStatus } from '@nestjs/common';

export class DefaultHttpException extends HttpException {
  constructor() {
    super('And error occured.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
