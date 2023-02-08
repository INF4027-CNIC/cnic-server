import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadFileService {
  /**
   * Get the profilepic url
   * @param file
   * @returns
   */
  async getAvatarUrl(file: Express.Multer.File) {
    return 'https://i.ibb.co/SsprMBP/DSC04837.jpg';
  }
}
