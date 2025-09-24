import { OptionsFilesDto } from '../dto/options.files.dto';
import { FilesInterface } from '../interfaces/files.interface';
import { decode } from '../helpers/decode.helper';
import { fileProcess } from '../helpers/file_process.helper';
import { save } from '../helpers/save.helper';

export async function processService(
  files: Express.Multer.File[],
  options: OptionsFilesDto,
): Promise<FilesInterface[]> {
  const filesList: FilesInterface[] = [];

  for (const item of files) {
    const fileObject = new FilesInterface(item);
    const fileDecoded = decode(fileObject);
    const file = await fileProcess(fileDecoded, options);

    if (!file) {
      const newFile = new FilesInterface({
        buffer: Buffer.from([]),
        mimetype: fileDecoded.mimetype,
        originalname: fileDecoded.originalname,
      });

      newFile.error = 'Not allow type';

      filesList.push(newFile);

      continue;
    }

    const { error, url } = await save(file, options);
    const { mimetype, originalname, size, timestamp } = file;

    const newFile = new FilesInterface({
      buffer: Buffer.from([]),
      mimetype,
      originalname,
      size,
      timestamp,
    });

    if (error) {
      newFile.error = error;
    }

    if (url) {
      newFile.url = url;
    }

    filesList.push(newFile);
  }

  return filesList;
}
