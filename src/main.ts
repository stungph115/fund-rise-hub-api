import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'env';
import { Server } from 'socket.io'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { UserService } from './user/user.service';

const express = require('express')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  const userService = app.get(UserService)
  userService.setSocketServer(io)

  app.use(cookieParser())
  app.use(bodyParser.json({ limit: '100mb' }))
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
  await app.listen(env.BACKEND_PORT);
}
bootstrap();
