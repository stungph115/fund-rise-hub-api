import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'env';
import { Server } from 'socket.io'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'

const express = require('express')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.BACKEND_PORT);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
  app.use(express.json(
    { limit: '200mb' }

  ))
  const server = app.getHttpServer()
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
    },
  })
  app.use(cookieParser())
  app.use(bodyParser.json({ limit: '100mb' }))
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
}
bootstrap();
