import express from 'express';
import { resolve } from 'path';
import './database';
import cors from 'cors';
// import delay from 'express-delay';
import homeRoutes from './routes/homeRouter';
import jwtTokenRoutes from './routes/jwtTokenRouter';
import photoRoutes from './routes/photoRouter';
import studentRoutes from './routes/studentRouter';
import userRoutes from './routes/userRouter';

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
    this.app.use(express.static(resolve(process.env.STATIC_DIR, 'uploads')));
    this.app.use(cors());
    // this.app.use(delay(3000));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/login', jwtTokenRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/students', studentRoutes);
    this.app.use('/photo', photoRoutes);
  }
}

export default new App().app;
