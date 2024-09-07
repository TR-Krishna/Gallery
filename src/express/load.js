import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import { handleFileUpload } from '../log/upload.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/', upload.single('file'), handleFileUpload);

export default router;
