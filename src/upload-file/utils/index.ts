import { Request } from 'express';
import { extname } from 'path';

export class UploadOperations {
  static getDestination(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    console.log("destination")
    callback(null, 'uploads');
  }

  static getFilename(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) {
    const uniqueSuffix = Date.now() + '-' + Math.floor(Math.random() * 1e9);

    const extension = extname(file.originalname);

    const prefixfile = file.originalname.split('.')[0];

    const filename = `${prefixfile}_${uniqueSuffix}${extension}`;

    callback(null, filename);
  }
}
