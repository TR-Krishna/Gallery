import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.v2.config({
  cloud_name: 'dfir5drnr',
  api_key: '355786555135944',
  api_secret: 'Vqz4K5t42zWcA4tcWN1CCg-mGeo',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png',
    public_id: (req, file) => file.filename,
  },
});

export { cloudinary, storage };