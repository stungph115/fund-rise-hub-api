import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { Role } from 'src/role/role.entity'
import { JwtService } from '@nestjs/jwt'
import { env } from 'env'
import { sha512 } from 'js-sha512'
import { Response } from 'express'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        private jwtService: JwtService
    ) { }

    async getUsersList() {

    }

    async getUser(id) {
        const user = await this.userRepository.findOneBy({ id: id })
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
        const password = sha512(addUserDto.password + env.USER_PASSWORD_KEY).slice(10, 40)
        const roleUser = await this.roleRepository.findOneBy({ name: 'user' })
        const user = this.userRepository.create({
            email: addUserDto.email,
            lastname: addUserDto.lastname,
            firstname: addUserDto.firstname,
            phone: addUserDto.phone,
            password: password,
            photo: null,
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

    async requestResetPassword() {

    }

    async resetPassword() {

    }
}
