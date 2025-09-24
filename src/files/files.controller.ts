import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
// import { Multer } from 'multer';
import { Data } from '../common/common.decorator';
import { FilesService } from './files.service';
import { OptionsFilesDto } from './dto/options.files.dto';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  async filesUploadImage(
    @UploadedFiles() files: Express.Multer.File[],
    @Data('options') options: OptionsFilesDto,
  ) {
    return await this.filesService.process(files, options);
  }
}
