import jwt from 'jsonwebtoken';
import User from '../model/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login requerido'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const jwtToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = jwtToken;

    // verify id and email > na prática, não colocar uma alteração de email
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }
    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
