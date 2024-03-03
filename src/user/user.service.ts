import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/role.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        private jwtService: JwtService
    ) { }

    async getUsersList() {

    }

    async getUser() {

    }

    async addUser() {

    }

    async updateUser() {

    }

    async deleteUser() {

    }

    async signInUser() {

    }

    async verifSignInUser() {

    }

    async signOutUser() {

    }

    async requestResetPassword() {

    }

    async resetPassword() {

    }
}
