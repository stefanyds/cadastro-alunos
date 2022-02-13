import multer from 'multer';
import { extname, resolve } from 'path';
import appConfig from './appConfig';

export default {
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') // foi um E pq nesse caso o OU é assim
    {
      return callback(new multer.MulterError('O arquivo precisa ser do tipo PNG ou JPG.'));
    }
    return callback(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, resolve(process.env.STATIC_DIR, 'uploads', appConfig.imagesFolder));
    },
    filename: (req, file, callback) => {
      callback(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`);
    },
  }),
};
