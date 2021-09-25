import express from 'express';
import './src/database';
import homeRoutes from './src/routes/homeRouter';
import userRoutes from './src/routes/userRouter';
import jwtTokenRoutes from './src/routes/jwtTokenRouter';

class App {
  constructor() {
    this.app = express();
    // para rodar o middlewares logo depois que chamou o App
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // utilizado para manipular conteúdos em requisições POST
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/login', jwtTokenRoutes);
  }
}

export default new App().app;
