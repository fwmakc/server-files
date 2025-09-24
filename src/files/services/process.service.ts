import { OptionsFilesDto } from '../dto/options.files.dto';
import { FilesInterface } from '../interfaces/files.interface';
import { save } from '../helpers/save.helper';
import { fileProcessService } from './file_process.service';

export async function processService(
  files: Express.Multer.File[],
  options: OptionsFilesDto,
) {
  const filesList: FilesInterface[] = [];

  for (const item of files) {
    let file = new FilesInterface(item);
    file = await fileProcessService(file, options);

    const { error, url } = await save(file, options);
    const { buffer, mimetype, originalname, size, timestamp } = file;

    const newFile = new FilesInterface({
      buffer,
      error,
      mimetype,
      originalname,
      size,
      timestamp,
      url,
    });

    filesList.push(newFile);
  }

  return filesList;
}
