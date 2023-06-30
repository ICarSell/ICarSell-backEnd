const cloudinary = require("cloudinary").v2;

// Configure o Cloudinary
cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
});

export const uploadImageToCloudinary = async (file: Express.Multer.File) => {
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
