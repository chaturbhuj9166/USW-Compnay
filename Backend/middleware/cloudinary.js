import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

// .env को कॉन्फ़िगर करें
dotenv.config();

// क्लाउडनरी कॉन्फ़िगरेशन
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// स्टोरेज सेटअप
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'press_portal',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'mp4'],
  },
});

const upload = multer({ storage: storage });

// ✅ ES Module में एक्सपोर्ट करने का सही तरीका
export default upload;