import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Data } from '../common/common.decorator';
import { FilesService } from './files.service';
import { OptionsFilesDto } from './dto/options.files.dto';
import { FilesInterface } from './interfaces/files.interface';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  async filesUploadImage(
    @UploadedFiles() files: Express.Multer.File[],
    @Data('convert') convert?: boolean,
    @Data('folder') folder?: string,
    @Data('rename') rename?: boolean,
    @Data('replace') replace?: boolean,
    @Data('resize') resize?: boolean,
  ): Promise<FilesInterface[]> {
    const options: OptionsFilesDto = {
      convert,
      folder,
      rename,
      replace,
      resize,
    };

    return await this.filesService.process(files, options);
  }
}
