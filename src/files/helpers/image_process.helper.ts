import { FilesInterface } from '../interfaces/files.interface';
import { OptionsFilesDto } from '../dto/options.files.dto';
import { imageResize } from './image_resize.helper';
import { getImageMetadata } from './get_image_metadata.helper';
import { imageConvert } from './image_convert.helper';

export async function imageProcess(
  file: FilesInterface,
  options: OptionsFilesDto,
): Promise<FilesInterface> {
  const { convert, resize } = options;

  if (resize) {
    file.buffer = await imageResize(file.buffer);
    const { size } = await getImageMetadata(file.buffer);
    file.size = size;
  }

  if (convert) {
    const converted = await imageConvert(file);

    file.buffer = converted.buffer;
    file.originalname = converted.originalname;
    file.mimetype = converted.mimetype;
    file.size = converted.size;
  }

  return file;
}
