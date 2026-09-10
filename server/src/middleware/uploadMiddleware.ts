import multer from 'multer';

// Configure multer to store uploaded files in memory temporarily
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB per image
});

export const uploadProductImages = upload.array('images', 4); // Accept up to 4 images with field name 'images'