import { v2 as cloudinary } from 'cloudinary';

// Initialisiere Cloudinary mit der URL aus dem .env.local
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export default cloudinary;