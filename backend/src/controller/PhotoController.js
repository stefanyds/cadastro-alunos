import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Photo from '../model/Photo';
import Student from '../model/Student';

const uploadMiddleware = multer(multerConfig).single('photo');

class PhotoController {
  store(req, res) {
    return uploadMiddleware(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const alunoId = req.body.aluno_id;
        const aluno = await Student.findByPk(alunoId);

        if (!aluno) {
          return res.status(400).json({
            errors: ['Aluno não existe'],
          });
        }
        const { originalname, filename } = req.file;
        const photo = await Photo.create({ originalname, filename, aluno_id: alunoId });
        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
    });
  }
}

export default new PhotoController();
