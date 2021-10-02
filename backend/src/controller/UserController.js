import User from '../model/User';

class UserController {
  async create(request, response) {
    try {
      const newUser = await User.create(request.body);
      const { id, name, email } = newUser;
      return response.json({ id, name, email });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  async index(request, response) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email'],
      });
      if (users) {
        return response.json(users);
      }
      // nesse caso se  não colocarmos isso, ele vai retornar algo nulo
      throw new Error();
    } catch (e) {
      return response.status(200).json('Nenhum usuário cadastrado');
    }
  }

  async show(request, response) {
    try {
      const user = await User.findByPk(request.userId);
      const { id, name, email } = user;
      if (user) {
        return response.json({ id, name, email });
      }
      return response.json({ errors: 'Usuário não encontrado' });
    } catch (e) {
      return response.status(500).json({ errors: 'Ops! Ocorreu um erro. Tente novamente mais tarde.' });
    }
  }

  async update(request, response) {
    try {
      const user = await User.findByPk(request.userId);

      if (!user) {
        return response.status(400).json({ errors: 'Usuário não encontrado' });
      }
      const updatedUser = await user.update(request.body);
      const { id, name, email } = updatedUser;
      // return response.status(204);
      return response.json({ id, name, email });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  async delete(request, response) {
    try {
      if (!request.params.id) {
        return response.status(400).json({ errors: 'ID não enviado.' });
      }

      const user = await User.findByPk(request.params.id);
      if (!user) {
        return response.status(400).json({ errors: 'Usuário não encontrado' });
      }
      await user.destroy();
      return response.json(user);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new UserController();

/*
try {
      const users = await User.findAll();
      if (users) {
        return response.json(users);
      }
      return response.json('Nenhum usuário cadastrado');
    } catch (e) {
      return response.status(500).json('Ops! Ocorreu um erro, tente novamente mais tarde');
    }
  }
  */
