import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { roleData } from 'src/dummy-data/role-data';

@Injectable()
export class RoleService {
    newDate = new Date
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) {
        this.saveRolesToDatabases()
    }

    async getRole() {

    }

    async addRole() {

    }

    async updateRole() {

    }

    async deleteRole() {

    }

    //add default data
    async saveRolesToDatabases() {
        const rolesExists = await this.roleRepository.find()
        if (rolesExists.length === 0) {
            try {
                roleData.forEach((async role => {
                    const newRole = this.roleRepository.create({
                        id: role.id,
                        name: role.name,
                        createdAt: this.newDate,
                        updatedAt: this.newDate
                    })
                    await this.roleRepository.save(newRole)
                }))
            } catch {
                console.log("error data insersion roles")
            }
        } else {
            return
        }
    }

}
