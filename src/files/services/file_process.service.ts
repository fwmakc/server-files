import { OptionsFilesDto } from '../dto/options.files.dto';
import { FilesInterface } from '../interfaces/files.interface';
import { allowTypes } from '../helpers/allow_types.helper';
import { isImageFile } from '../helpers/is_image_file.helper';
import { maxSize } from '../helpers/max_size.helper';
import { decodeService } from './decode.service';
import { imageProcessService } from './image_process.service';
import { renameFile } from '../helpers/rename_file.helper';

export async function fileProcessService(
  file: FilesInterface,
  options: OptionsFilesDto,
): Promise<FilesInterface> {
  const { rename } = options;

  const fileSize = maxSize(file);
  const allowType = allowTypes(file);

  if (!fileSize || !allowType) {
    return file;
  }

  const isImage = isImageFile(file);
  if (isImage) {
    file = await imageProcessService(file, options);
  }

  if (rename) {
    return renameFile(file);
  }

  return decodeService(file);
}
