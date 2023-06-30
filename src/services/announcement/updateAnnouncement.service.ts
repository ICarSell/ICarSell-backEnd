import { Repository } from "typeorm";
import { IReturnAnnouncement, IUpdateAnnouncement } from "../../interfaces";
import { Announcement, ImgCover, Gallery } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnAnnouncementSchema } from "../../schemas";
const cloudinary = require("cloudinary").v2;

// Configure o Cloudinary
cloudinary.config({
  cloud_name: "dqbeocdcm",
  api_key: "823447954476992",
  api_secret: "8jPMadTfs7b-1kn5gst0U8CosiQ",
});

export const updateAnnouncementService = async (
  data: any,
  idAnnouncement: string,
  imgCoverFile: Express.Multer.File | undefined,
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

  if (!oldAnnouncementData) {
    throw new Error("Announcement not found");
  }

  const updatedAnnouncementData: IUpdateAnnouncement = {
    ...oldAnnouncementData,
    ...data,
    isActive: data.isActive === "true",
  };

  if (imgCoverFile) {
    if (oldAnnouncementData.imgCover?.path) {
      await deleteImageFromCloudinary(oldAnnouncementData.imgCover.path);
    }

    const imgCoverUrl = await uploadImageToCloudinary(imgCoverFile);

    const imgCover: any = new ImgCover();
    imgCover.fileName = imgCoverFile.filename;
    imgCover.path = imgCoverUrl;

    await imgCoverRepository.save(imgCover);

    updatedAnnouncementData.imgCover = imgCover;
  }

  if (galleryFiles && galleryFiles.length > 0) {
    if (oldAnnouncementData.gallery && oldAnnouncementData.gallery.length > 0) {
      await Promise.all(
        oldAnnouncementData.gallery.map((gallery: any) =>
          deleteImageFromCloudinary(gallery.path)
        )
      );
    }

    await galleryRepository.delete({ announcement: oldAnnouncementData });

    const galleryPromises = galleryFiles.map(async (file) => {
      const galleryUrl = await uploadImageToCloudinary(file);

      const gallery: any = new Gallery();
      gallery.fileName = file.filename;
      gallery.path = galleryUrl;
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

// Função para excluir imagem do Cloudinary
const deleteImageFromCloudinary = async (path: string) => {
  const publicId = extractPublicIdFromCloudinaryUrl(path);
  return cloudinary.uploader.destroy(publicId);
};

// Função para fazer upload de imagem para o Cloudinary
const uploadImageToCloudinary = async (file: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      {
        folder: "uploads", // Substitua pelo nome da pasta desejada no Cloudinary
      },
      (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
  });
};

// Função para extrair o public ID de uma URL do Cloudinary
const extractPublicIdFromCloudinaryUrl = (url: string) => {
  const startIndex = url.lastIndexOf("/") + 1;
  const endIndex = url.lastIndexOf(".");
  return url.substring(startIndex, endIndex);
};
