import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from '../config/logger';
import morgan from 'morgan';
import userAuthRoute from '../apps/auth/routes/userAuthRoute';

import newsRoute from '../apps/news/routes/newsRoute';

import globalErrorHandler from '../utils/errorController';
import messageRouter from '../apps/messaging/routes/messageRoutes';
import AppError from '../utils/appError';

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

const app = express();
global.logger = Logger.createLogger({ label: 'ConnectUs Backend' });

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

app.get(`/healthcheck`, (req, res) => {
  res.status(200).send('ConnectUs Backend is online and healthy techies');
});

app.use('/auth', userAuthRoute);

app.use('/news', newsRoute);

app.use('/messages', messageRouter);

app.get('/', (req, res) => {
  res.status(200).send('ConnectUs Backend is online and healthy techies');
});

app.all('*', (req, res, next) => {
  return next(
    new AppError(
      `The requested page: ${req.originalUrl} not found on this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

export default app;
