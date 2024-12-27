import { AppModule } from '@app.module';
import { default as dataSourceLog } from '@config/data.source-log';
import { default as dataSource } from '@config/data.source';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

const bootstrap = async (): Promise<void> => {
  try {
    await dataSource.initialize();
    Logger.log('DataSource initialized');
  } catch (error) {
    Logger.error('Failed to initialize DataSource ', error);
  }
  try {
    await dataSourceLog.initialize();
    Logger.log('DataSource Log initialized');
  } catch (error) {
    Logger.error('Failed to initialize DataSource Log', error);
  }

  const port = process.env.PORTHTTP;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'verbose', 'warn', 'fatal'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Minha API')
    .setDescription('APIs do novo portal sevenloc.')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
  Logger.verbose(`Aplication run in port: ${port}`, 'Bootstrap');
};
bootstrap();
