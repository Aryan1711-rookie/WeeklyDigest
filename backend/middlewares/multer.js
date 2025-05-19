import multer from 'multer';
const storage = multer.memoryStorage();
export const memoryUpload = multer({ storage }).fields([
    { name: 'banner', maxCount: 1},
    { name: 'avatar', maxCount: 1}
])