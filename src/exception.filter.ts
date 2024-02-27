import { ArgumentsHost, Catch, ExceptionFilter as NestExceptionFilter, HttpException, HttpStatus } from "@nestjs/common"
import { MailerService } from 'src/mailer/mailer.service'

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
    constructor(
        private mailerService: MailerService
    ) { }

    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR


        if ((status < 200 || status > 206) && status != 401) {
            console.error(exception)
            await this.mailerService.sendErrorAlert(exception.message, request.body, request.originalUrl).catch(err => {
                console.error('An error happened while trying to send an error email', err, exception)
            })
        }

        await response.status(status).send(exception.response)
    }

}
