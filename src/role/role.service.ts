import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) { }

    async getRole() {

    }

    async addRole() {

    }

    async updateRole() {

    }

    async deleteRole() {

    }

}
