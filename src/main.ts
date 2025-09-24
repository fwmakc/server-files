/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import fileStore from 'session-file-store';
import session from 'express-session';

const FileStoreSession = fileStore(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      allowedHeaders: [
        'Content-Type',
        'Vary',
        'Accept',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
        'Authorization',
        'Token',
        'X-Requested-With',
      ],
      exposedHeaders: [
        'Content-Type',
        'Vary',
        'Accept',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
        'Authorization',
        'Token',
        'X-Requested-With',
      ],
      origin: true,
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
    logger: console,
    abortOnError: true,
  });

  if (process.env.PREFIX) {
    app.setGlobalPrefix(process.env.PREFIX);
  }

  console.log('SESSION_EXPIRES', Number(process.env.SESSION_EXPIRES));

  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: Number(process.env.SESSION_EXPIRES) || -3600,
      },
      store: new FileStoreSession({}),
    }),
  );

  app.useStaticAssets(join(process.env.UPLOADS_PATH || ''), {
    prefix: process.env.PREFIX || '',
  });

  const port = process.env.PORT || 5000;
  const ip = process.env.IP || 'localhost';
  const message = `Server running \n in ${process.env.NODE_ENV} mode on ${port} port \n at http://${ip}:${port}`;

  await app.listen(port, ip).then(() => {
    console.log(message);
  });

  // Корректно завершаем сервер
  process.on('SIGINT', () => {
    app.close().catch((e) => console.log(e));
  });
}

bootstrap().catch((e) => console.log(e));
