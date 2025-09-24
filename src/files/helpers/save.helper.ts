import { access, mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { FilesInterface } from '../interfaces/files.interface';
import { OptionsFilesDto } from '../dto/options.files.dto';

export async function save(file: FilesInterface, options: OptionsFilesDto) {
  const { folder, replace } = options;

  const userFolder = `${folder || ''}`.replace(/[^\w\d/]/gu, '');
  const uploadFolder = join(process.env.UPLOADS_PATH || '', userFolder);

  const url = `${process.env.UPLOADS_URL}/${userFolder ? `${userFolder}/` : ''}${
    file.originalname
  }`;

  try {
    await access(uploadFolder);
  } catch (e) {
    await mkdir(uploadFolder, { recursive: true });
  }

  if (!file) {
    return {
      error: 'Файл не задан',
      url,
    };
  }

  const filePath = join(uploadFolder, file.originalname);

  if (!replace && existsSync(filePath)) {
    return {
      error: 'Файл уже существует',
      url,
    };
  }

  try {
    await writeFile(filePath, file.buffer);
  } catch (e) {
    return {
      error: 'Ошибка при записи файла',
      url,
    };
  }

  return {
    url,
  };
}
