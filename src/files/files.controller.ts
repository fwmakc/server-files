import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import fs from 'fs';
import { join } from 'path';
import { Data, Secure } from '../common/common.decorator';
import { FilesService } from './files.service';
import { OptionsFilesDto } from './dto/options.files.dto';
// import { FilesInterface } from './interfaces/files.interface';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('{/*path}/:filename')
  getFile(
    @Param('filename') filename: string,
    @Param('path') path = [],
    @Res() res: Response,
  ) {
    if (filename.includes('..')) {
      return res.status(400).send('Invalid filename');
    }

    const filePath = join(
      __dirname,
      '../../',
      process.env.UPLOADS_PATH || '',
      ...path,
      filename,
    );

    console.log('-- filePath', filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }

    res.sendFile(filePath, (error) => {
      if (error) {
        res.status(500).send('Could not send file');
      }
    });
  }

  @Secure()
  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  async filesUploadImage(
    @UploadedFiles() files: Express.Multer.File[],
    @Data('convert') convert?: boolean,
    @Data('folder') folder?: string,
    @Data('rename') rename?: boolean,
    @Data('replace') replace?: boolean,
    @Data('resize') resize?: boolean,
  ) {
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
