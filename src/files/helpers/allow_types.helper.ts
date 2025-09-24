import { FilesInterface } from '../interfaces/files.interface';

export function allowTypes(file: FilesInterface) {
  const types = process.env.UPLOADS_ALLOW_TYPES || '';

  if (!types) {
    return true;
  }

  // if (Array.isArray(typesArray)) {
  //   types = types.join(';');
  // }

  const mimetype = file.mimetype.split('/');

  return types.includes(mimetype[0]) || types.includes(mimetype[1]);
}
