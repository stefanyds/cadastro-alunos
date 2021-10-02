import Student from '../model/Student';

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll();

      if (students) {
        return res.json(students);
      }
      throw new Error(); // faz cair no catch
    } catch (error) {
      return res.status(400).json({
        errors: ['Nenhum aluno cadastrado'],
      });
    }
  }
}

export default new StudentController();
