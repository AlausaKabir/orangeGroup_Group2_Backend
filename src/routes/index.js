import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from '../config/logger';
import morgan from 'morgan';
import userAuthRoute from '../apps/auth/routes/userAuthRoute';

const app = express();
global.logger = Logger.createLogger({ label: 'ConnectUs Backend' });


app.use(helmet());
app.use(cors({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

app.get(`/healthcheck`, (req, res) => {
  res.status(200).send('ConnectUs Backend is online and healthy techies');
});

// ## AUTH ROUTES ##
app.use('/auth', userAuthRoute);



export default app;
