import express from 'express';
import homeRoutes from './src/routes/homeRouter';

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
  }
}

export default new App().app;
