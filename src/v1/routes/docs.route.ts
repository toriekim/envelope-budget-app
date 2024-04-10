import express from 'express';
import swagger from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../../config/swagger';

const router = express.Router();

const specs = swagger(swaggerOptions);

router.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCssUrl:
      'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-muted.css',
  })
);

export default router;
