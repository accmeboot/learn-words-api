import { ValidationPipe } from './shared/validation.pipe';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'dotenv/config';

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(port);

  Logger.verbose(`Server running on http://${host}:${port}, Bootstrap`);
}
bootstrap();
