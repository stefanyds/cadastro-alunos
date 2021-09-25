import jwt from 'jsonwebtoken';

export default (req, res, next) => {
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

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
