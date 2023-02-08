import { BadRequestException, PipeTransform } from '@nestjs/common';
import {
  AUDIO,
  DOCUMENT,
  IMAGE,
  ONE_MB,
  VIDEO,
} from '../upload-file.constants';

type FileType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT';

export class FileSizeValidation implements PipeTransform {
  private filetype: FileType;

  constructor(filetype: FileType) {
    this.filetype = filetype;
  }

  transform(value: Express.Multer.File) {
    if (!value) return;

    if (!this.isFileSizeValid(value.size))
      throw new BadRequestException('The file size is too big.');

    return value;
  }

  private isFileSizeValid(filesize: number): boolean {
    switch (this.filetype) {
      case IMAGE:
        return filesize <= ONE_MB * 4;

      case VIDEO:
        return filesize <= ONE_MB * 20;

      case AUDIO:
        return filesize <= ONE_MB * 5;

      case DOCUMENT:
        return filesize <= ONE_MB * 20;
    }
  }
}
