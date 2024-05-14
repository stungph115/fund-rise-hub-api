import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { Role } from 'src/role/role.entity'
import { JwtService } from '@nestjs/jwt'
import { env } from 'env'
import { sha512 } from 'js-sha512'
import { Response } from 'express'
import Stripe from 'stripe';
import { MailerService } from 'src/mailer/mailer.service'
import { Server } from 'socket.io'

@Injectable()
export class UserService {
    private stripe
    private socketServer: Server
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        private jwtService: JwtService,
        private mailerService: MailerService,
    ) {
        this.stripe = new Stripe(env.STRIPE_API_SECRET_KEY, {
            apiVersion: '2023-10-16',
        })
    }
    setSocketServer(socketServer: Server) {
        this.socketServer = socketServer
    }
    async getUsersList() {

    }

    async getUser(id) {
        const user = await this.userRepository.findOne({ where: { id: id }, relations: { follower: { following: true }, following: { follower: true, } } })
        if (!user) {
            throw new HttpException("USER_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return user
    }

    async addUser(addUserDto: any) {
        const userEmail = await this.userRepository.findOneBy({ email: addUserDto.email })
        if (userEmail) {
            throw new HttpException("EMAIL_ALREADY_EXIST", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        var idStripe: string
        try {
            const newStripeCustomer = await this.stripe.customers.create({
                name: addUserDto.firstname + ' ' + addUserDto.lastname,
                email: addUserDto.email
            })
            idStripe = newStripeCustomer.id
        } catch (error) {
            throw new HttpException("STRIPE_ERROR_" + error.raw.code, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const password = sha512(addUserDto.password + env.USER_PASSWORD_KEY).slice(10, 40)
        const roleUser = await this.roleRepository.findOneBy({ name: 'user' })
        const user = this.userRepository.create({
            email: addUserDto.email,
            lastname: addUserDto.lastname,
            firstname: addUserDto.firstname,
            phone: addUserDto.phone,
            password: password,
            photo: null,
            stripeId: idStripe,
            role: roleUser,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        const userSave = await this.userRepository.save(user)
        if (!userSave) {
            throw new HttpException("ERROR_USER_CREATION", HttpStatus.INTERNAL_SERVER_ERROR)
        } else {
            throw new HttpException("USER_CREATED", HttpStatus.CREATED)
        }
    }


    async updateUser(userId: number, updateUserDto: any): Promise<string> {
        console.log(updateUserDto)
        const user = await this.userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if (updateUserDto.email) {
            user.email = updateUserDto.email
        }
        if (updateUserDto.lastname) {
            user.lastname = updateUserDto.lastname
        }
        if (updateUserDto.firstname) {
            user.firstname = updateUserDto.firstname
        }
        if (updateUserDto.phone) {
            user.phone = updateUserDto.phone
        }
        if (updateUserDto.photo) {
            user.photo = updateUserDto.photo
        }
        if (updateUserDto.password) {
            const password = sha512(updateUserDto.password + env.USER_PASSWORD_KEY).slice(10, 40);
            user.password = password
        }
        user.updatedAt = new Date
        const updatedUser = await this.userRepository.save(user)
        if (!updatedUser) {
            throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        this.socketServer.emit("user_updated_" + userId)
        return 'User updated successfully'
    }
    async changePassword(params: any) {
        if (params.oldPassword === params.newPassword) {
            throw new HttpException('PASSWORD_IS_OLD_PASSWORD', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const user = await this.userRepository.findOneBy({ id: params.id })
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const oldPassword = sha512(params.oldPassword + env.USER_PASSWORD_KEY).slice(10, 40)
        const newPassword = sha512(params.newPassword + env.USER_PASSWORD_KEY).slice(10, 40)
        if (oldPassword !== user.password) {
            throw new HttpException('PASSWORD_NOT_MATCHED', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        user.password = newPassword
        user.updatedAt = new Date
        const updatedUser = await this.userRepository.save(user)
        if (!updatedUser) {
            throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return 'User updated successfully'

    }
    async deleteUser() {

    }

    async signInUser(signInUserParams: any, response: Response) {
        if (!signInUserParams.email || !signInUserParams.password) {
            throw new HttpException('ERROR_PARAMS', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const user = await this.userRepository.findOne({
            where: {
                email: signInUserParams.email
            },
            relations: {
                role: true
            }
        })
        if (!user) {
            throw new HttpException('USER_NOT_FOUND', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const password = sha512(signInUserParams.password + env.USER_PASSWORD_KEY).slice(10, 40)
        if (password != user.password) {
            throw new HttpException('ERROR_PASS', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const tokenJWT = await this.jwtService.signAsync({ id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname, role: user.role, photo: user.photo })
        if (!tokenJWT) {
            throw new HttpException('ERROR_TOKENJWT', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        /* response.cookie('tokenJWT', tokenJWT) */

        throw new HttpException(tokenJWT, HttpStatus.OK)
    }

    async verifSignInUser(signInUserParams: any, response: Response) {

        try {
            if (!signInUserParams.tokenJWT) {
                throw new HttpException('ERROR_PARAMS', HttpStatus.UNPROCESSABLE_ENTITY);
            }

            const decodedToken = await this.jwtService.verifyAsync(signInUserParams.tokenJWT);

            if (!decodedToken) {
                throw new HttpException('ERROR_TOKENJWT', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            /* response.cookie('tokenJWT', signInUserParams.tokenJWT, { httpOnly: true }); */
            console.log("token verfied")
            return 'TOKENJWT_VERIFIED';
        } catch (err) {
            if (err.message == 'jwt expired') {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            } else {
                throw new HttpException('ERROR_TOKENJWT', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async signOutUser(response: Response) {
        response.clearCookie('tokenJWT')
        throw new HttpException("DISCONNECTED", HttpStatus.OK)
    }

    async requestResetPassword(email: string) {
        console.log(email)
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new HttpException('USER_NOT_FOUND', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        //create token
        const tokenResetPassword = await this.jwtService.sign({ email: email }, { secret: env.RESET_PASSWORD_KEY, expiresIn: '15m' })

        //send mail reset password
        try {
            await this.mailerService.sendResetPasswordEmail(user.firstname, tokenResetPassword, [email])
            return {
                statusCode: 201,
                message: 'REQUEST_SENT'
            }
        } catch (err) {
            throw new HttpException('REQUEST_NOT_SENT', HttpStatus.BAD_REQUEST)
        }
    }

    async resetPassword(resetpasswordParams: any) {
        //verify token
        try {
            this.jwtService.verify(resetpasswordParams.token, { secret: env.RESET_PASSWORD_KEY })

        } catch (error) {
            throw new HttpException("TOKEN_INVALID", HttpStatus.BAD_REQUEST)
        }
        const decodedToken = this.jwtService.verify(resetpasswordParams.token, { secret: env.RESET_PASSWORD_KEY })
        //check user existe
        const userExist = await this.userRepository.findOne({
            where: {
                email: decodedToken.email
            }
        })
        if (!userExist) {
            throw new HttpException('USER_NOT_FOUND', HttpStatus.FORBIDDEN)
        }
        //update password
        const password = sha512(resetpasswordParams.password + env.USER_PASSWORD_KEY).slice(10, 40)
        if (password == userExist.password) {
            throw new HttpException("OLD_PASSWORD_NOT_ACCEPTED", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const user: Partial<User> = {
            password: password,
            updatedAt: new Date(),
        }
        const userUpdate = await this.userRepository.update({ id: userExist.id }, { ...user })
        if (!userUpdate) {
            throw new HttpException("ERROR_USER_UPDATING", HttpStatus.INTERNAL_SERVER_ERROR)
        } else {
            throw new HttpException("USER_UPDATED", HttpStatus.OK)
        }
    }
}
