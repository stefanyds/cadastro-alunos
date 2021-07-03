import Student from '../model/student';

class HomeController {
  async index(req, res) {
    const newStudent = await Student.create({
      name: 'Devmaster',
      lastname: 'Programmer Hero',
      email: 'devmaster@programmerhero.com.br',
      age: 21,
      weight: 99,
      height: 1.67,
    });
    // para exibir o que for adicionado
    res.json(newStudent);
  }
}

export default new HomeController();
