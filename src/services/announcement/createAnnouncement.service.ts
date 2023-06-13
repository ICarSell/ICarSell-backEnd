import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement, Gallery, ImgCover } from "../../entities";
import { IAnnouncement, IReturnAnnouncement } from "../../interfaces";
import { returnAnnouncementSchema } from "../../schemas";

export const createAnnouncementService = async (
  data: IAnnouncement,
  imgCoverFile: Express.Multer.File,
  galleryFiles: Express.Multer.File[]
): Promise<IReturnAnnouncement> => {
  try {
    const announcementRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);
    const imgCoverRepository: Repository<ImgCover> =
      AppDataSource.getRepository(ImgCover);
    const galleryRepository: Repository<Gallery> =
      AppDataSource.getRepository(Gallery);

    const announcement = announcementRepository.create(data);

    const imgCover = new ImgCover();
    imgCover.fileName = imgCoverFile.filename;
    imgCover.path = imgCoverFile.path;

    await imgCoverRepository.save(imgCover);

    announcement.imgCover = imgCover;

    await announcementRepository.save(announcement);

    announcement.gallery = []; // Inicialize a propriedade como um array vazio

    const galleryPromises = galleryFiles.map(async (galleryFile) => {
      const gallery = new Gallery();
      gallery.fileName = galleryFile.filename;
      gallery.path = galleryFile.path;
      gallery.announcement = announcement;

      await galleryRepository.save(gallery);

      announcement.gallery.push(gallery); // Adicione o objeto gallery ao array

      return gallery;
    });

    await Promise.all(galleryPromises);

    const newAnnouncement = returnAnnouncementSchema.parse(announcement);

    return newAnnouncement;
  } catch (error) {
    // Trate o erro adequadamente
    console.error(error);
    throw error; // Lançe novamente o erro para ser tratado em um middleware de erro ou tratamento de exceção global
  }
};
