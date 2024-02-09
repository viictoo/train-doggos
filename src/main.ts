import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './corsOptions';
import { MyLoggerService } from './my_logger/my_logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'fatal', 'verbose']
  });
  // app.enableCors(corsOptions)
  // enable cors globally for dev
  const config = new DocumentBuilder()

    .setTitle('Median')

    .setDescription('The Median API description')

    .setVersion('0.1')

    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useLogger(app.get(MyLoggerService))
  app.enableCors()
  app.setGlobalPrefix('api')
  await app.listen(3000, () => console.log("listening on port 3000"));
}
bootstrap();
