import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement, Gallery, ImgCover, User } from "../../entities";
import { IAnnouncement, IReturnAnnouncement } from "../../interfaces";
import { returnAnnouncementSchema } from "../../schemas";
const cloudinary = require("cloudinary").v2;

interface CloudinaryUploadResult {
  secure_url: string;
}

export const createAnnouncementService = async (
  data: IAnnouncement,
  imgCoverFile: Express.Multer.File,
  galleryFiles: Express.Multer.File[],
  sellerId: string
): Promise<IReturnAnnouncement> => {
  try {
    const announcementRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);
    const imgCoverRepository: Repository<ImgCover> =
      AppDataSource.getRepository(ImgCover);
    const galleryRepository: Repository<Gallery> =
      AppDataSource.getRepository(Gallery);

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: sellerId,
      },
    });

    const imgCoverResult = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader.upload(
          imgCoverFile.path,
          (err: any, result: CloudinaryUploadResult) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      }
    );

    const galleryResults = await Promise.all(
      galleryFiles.map((galleryFile) => {
        return new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader.upload(
            galleryFile.path,
            (err: any, result: CloudinaryUploadResult) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
      })
    );

    const imgCoverPath = imgCoverResult.secure_url;
    const galleryPaths = galleryResults.map((result) => result.secure_url);

    const announcement = announcementRepository.create({
      ...data,
      user: user!,
    });

    const imgCover = new ImgCover();
    imgCover.fileName = imgCoverFile.filename;
    imgCover.path = imgCoverPath; // Atualiza o caminho com a URL do Cloudinary

    await imgCoverRepository.save(imgCover);

    announcement.imgCover = imgCover;

    await announcementRepository.save(announcement);

    announcement.gallery = [];

    const galleryPromises = galleryFiles.map(async (galleryFile, index) => {
      const gallery = new Gallery();
      gallery.fileName = galleryFile.filename;
      gallery.path = galleryPaths[index]; // Atualiza o caminho com a URL do Cloudinary
      gallery.announcement = announcement;

      await galleryRepository.save(gallery);

      announcement.gallery.push(gallery);
      return gallery;
    });

    await Promise.all(galleryPromises);

    const newAnnouncement = returnAnnouncementSchema.parse(announcement);

    return newAnnouncement;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
