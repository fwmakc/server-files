import { Injectable } from '@nestjs/common';
import { FilesInterface } from './interfaces/files.interface';
import { OptionsFilesDto } from './dto/options.files.dto';
import { decodeService } from './services/decode.service';
import { fileProcessService } from './services/file_process.service';
import { imageProcessService } from './services/image_process.service';
import { processService } from './services/process.service';

@Injectable()
export class FilesService {
  constructor() {}

  decode(file: FilesInterface): FilesInterface {
    return decodeService(file);
  }

  async fileProcess(file: FilesInterface, options: OptionsFilesDto) {
    return fileProcessService(file, options);
  }

  async imageProcess(file: FilesInterface, options: OptionsFilesDto) {
    return imageProcessService(file, options);
  }

  async process(files: Express.Multer.File[], options: OptionsFilesDto) {
    return processService(files, options);
  }
}
