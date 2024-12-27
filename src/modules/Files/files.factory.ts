import { ListFilesDTO } from './dto/listFiles.dto copy';
import { FilesEntity } from './entity/file.sevenloc.entity';

export class FilesFactory {
  static mapFilesToDTO(file: FilesEntity): ListFilesDTO {
    return new ListFilesDTO({
      id: file.id,
      name: file.name,
      path: file.path,
      supplierId: file.supplierId,
      createdBy: file.createdBy,
      updatedBy: file.updatedBy,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
    });
  }
}
