import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'env';
import { Server } from 'socket.io'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { UserService } from './user/user.service';
import { ConversationService } from './conversation/conversation.service';
import { NotificationService } from './notification/notification.service';
import { FileChatService } from './file-chat/file-chat.service';
import { MessageService } from './message/message.service';
import { PaymentService } from './payment/payment.service';

const express = require('express')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/webhook', bodyParser.raw({ type: 'application/json' }));
  app.enableCors({
    origin: ['http://localhost:3000', env.NETWORK_URL],
    credentials: true,
  })
  app.use(express.json(
    { limit: '200mb' }

  ))
  const server = app.getHttpServer()
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", env.NETWORK_URL],
    },
  })
  const userService = app.get(UserService)
  const messageService = app.get(MessageService)
  const fileChatService = app.get(FileChatService)
  const notificationService = app.get(NotificationService)
  const paymentService = app.get(PaymentService)

  notificationService.setSocketServer(io)
  messageService.setSocketServer(io)
  fileChatService.setSocketServer(io)
  userService.setSocketServer(io)
  paymentService.setSocketServer(io)

  app.use(cookieParser())
  app.use(bodyParser.json({ limit: '100mb' }))
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
  await app.listen(env.BACKEND_PORT);
}
bootstrap();
