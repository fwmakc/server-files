import { OptionsFilesDto } from '../dto/options.files.dto';
import { FilesInterface } from '../interfaces/files.interface';
import { allowTypes } from './allow_types.helper';
import { imageProcess } from './image_process.helper';
import { isImageFile } from './is_image_file.helper';
import { maxSize } from './max_size.helper';
import { renameFile } from './rename_file.helper';

export async function fileProcess(
  file: FilesInterface,
  options: OptionsFilesDto,
): Promise<FilesInterface | null> {
  const { rename } = options;

  const fileSize = maxSize(file);
  const allowType = allowTypes(file);

  if (!fileSize || !allowType) {
    return null;
  }

  const isImage = isImageFile(file);
  if (isImage) {
    file = await imageProcess(file, options);
  }

  if (rename) {
    return renameFile(file);
  }

  return file;
}
