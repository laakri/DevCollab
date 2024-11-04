import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  const port = configService.get<number>('env.port');
  await app.listen(port);

  logger.log(`Application running on port ${port}`);
  logger.log(`Environment: ${configService.get('env.nodeEnv')}`);
}
bootstrap();
