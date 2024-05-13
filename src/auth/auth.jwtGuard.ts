import { Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private jwtService: JwtService) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const authorization = request.headers['authorization'];
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const token = authorization.split(' ')[1];
        try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded;
            return true;
        } catch (error) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }
}
