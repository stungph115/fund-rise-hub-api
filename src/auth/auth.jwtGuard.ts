import { Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {
            const request = context.switchToHttp().getRequest()
            const cookie = request.cookies['tokenJWT']
            if (!cookie) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
            }
            const data = await this.jwtService.verifyAsync(cookie)
            if (!data) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
            }
            const user = await this.userRepository.findOne({
                where: {
                    id: data['id'],
                    email: data['email'],
                    firstname: data['firstname'],
                    lastname: data['lastname']
                },
                relations: {
                    role: true
                }
            })
            if (!user) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
            }
            const role = this.reflector.get<string>('role', context.getHandler())

            request.body['userId'] = user.id

            const userId = this.reflector.get<string>('userId', context.getHandler())
            const setRole = this.reflector.get<string>('setRole', context.getHandler())
            if (userId) {
                request.body[userId] = user.id
            }
            if (setRole) {
                request.body[setRole] = user.role.name
            }

            if (role == 'user' && (user.role.name == 'user' || user.role.name == 'super-user' || user.role.name == 'admin')) {
                return true
            } else if (role == 'super-user' && (user.role.name == 'super-user' || user.role.name == 'admin')) {
                return true
            } else if (role == 'admin' && user.role.name == 'admin') {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }

    }

}
