import server from './routes/index';
import keys from './config/keys';
import MongoConnection from './database/setup';

const Port = keys.PORT || 8080;

const startServer = async () => {
  try {
    await MongoConnection();
    await server.listen(Port, () => {
      logger.info(`Server listening on port ${Port}`);
    });
  } catch (error) {
    logger.error(`Error starting server: ${error.message}`);
  }
};

startServer();
