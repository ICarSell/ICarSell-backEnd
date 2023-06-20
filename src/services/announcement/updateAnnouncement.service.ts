import { Repository } from "typeorm";
import { IReturnAnnouncement, IUpdateAnnouncement } from "../../interfaces";
import { Announcement, ImgCover, Gallery } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnAnnouncementSchema } from "../../schemas";

export const updateAnnouncementService = async (
  data: any,
  idAnnouncement: string,
  imgCoverFile: Express.Multer.File,
  galleryFiles: Express.Multer.File[]
): Promise<IReturnAnnouncement> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  const imgCoverRepository: Repository<ImgCover> =
    AppDataSource.getRepository(ImgCover);
  const galleryRepository: Repository<Gallery> =
    AppDataSource.getRepository(Gallery);

  const oldAnnouncementData = await announcementRepository.findOne({
    where: {
      id: idAnnouncement,
    },
    relations: {
      imgCover: true,
      gallery: true,
    },
  });

  const updatedAnnouncementData = {
    ...oldAnnouncementData,
    ...data,
    isActive: data.isActive === "true",
  };

  if (imgCoverFile) {
    const imgCover = new ImgCover();
    imgCover.fileName = imgCoverFile.filename;
    imgCover.path = imgCoverFile.path;

    await imgCoverRepository.save(imgCover);

    updatedAnnouncementData.imgCover = imgCover;
  }

  if (galleryFiles && galleryFiles.length > 0) {
    await galleryRepository.delete({ announcement: oldAnnouncementData });

    const galleryPromises = galleryFiles.map(async (galleryFile) => {
      const gallery = new Gallery();
      gallery.fileName = galleryFile.filename;
      gallery.path = galleryFile.path;
      gallery.announcement = updatedAnnouncementData;

      await galleryRepository.save(gallery);

      return gallery;
    });

    const newGalleryImages = await Promise.all(galleryPromises);
    updatedAnnouncementData.gallery = newGalleryImages;
  }

  const updatedAnnouncement = await announcementRepository.save(
    updatedAnnouncementData
  );

  const announcement = returnAnnouncementSchema.parse(updatedAnnouncement);

  return announcement;
};
