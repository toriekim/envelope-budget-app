import dotenv from 'dotenv';
import app from './server';

dotenv.config();

const PORT = process.env.PORT || 3000;

const init = async () => {
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
};

init();
