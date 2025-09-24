import { Injectable } from '@nestjs/common';
import { FilesInterface } from './interfaces/files.interface';
import { OptionsFilesDto } from './dto/options.files.dto';
import { processService } from './services/process.service';

@Injectable()
export class FilesService {
  constructor() {}

  async process(
    files: Express.Multer.File[],
    options: OptionsFilesDto,
  ): Promise<FilesInterface[]> {
    return processService(files, options);
  }
}
