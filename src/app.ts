// Config
import express from 'express';
import cors from 'cors';
import handlerError from './Shared/Infrastructure/Utils/Middlewares/HandlerError';

// Routers
import { UsuarioRouter } from './Usuarios/Infrastructure/Router';
import { PagoRouter } from './Pagos/Infrastructure/Router';
import { MembresiaRouter } from './Membresias/Infrastructure/Router';
import { PromocionRouter } from './Promociones/Infrastructure/Router';

// CONSTS
const PREFIX = '/api/v1';

const app = express();

// Config
app.use(express.json());
app.use(cors());

// Routes
/* swaggerSpec(app); */
app.use(PREFIX, UsuarioRouter);
app.use(PREFIX, PagoRouter);
app.use(PREFIX, MembresiaRouter);
app.use(PREFIX, PromocionRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({ message: 'Not found' });
  next();
});

// Middlewares
app.use(handlerError);

export { app };
