import { BadRequestException, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

export class FileExtensionValidation implements PipeTransform {
  transform(value: Express.Multer.File) {
    if (!value) return;

    const extension = extname(value.originalname).split('.')[1];

    if (!this.isFileExtensionValid(extension))
      throw new BadRequestException('Provide a file with a valid format.');

    return value;
  }

  private isFileExtensionValid(fileExtension: string) {
    const VALID_EXTENSIONS = ['webp', 'jpeg', 'png', 'mp4'];

    return VALID_EXTENSIONS.includes(fileExtension);
  }
}
