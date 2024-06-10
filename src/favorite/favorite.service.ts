import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Project } from 'src/project/project.entity';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(Favorite) private favoriteRepository: Repository<Favorite>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Project) private projectRepository: Repository<Project>,

    ) { }
    async addFavorite(params: any) {
        const user = await this.userRepository.findOneBy({ id: params.userId })
        const project = await this.projectRepository.findOneBy({ id: params.projectId })
        const newFavorite = this.favoriteRepository.create({
            user: user,
            project: project,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const favoriteSave = this.favoriteRepository.save(newFavorite)
        return 201
    }

    async deleteFavorite(id: number) {
        const favoriteDelete = await this.favoriteRepository.delete({ id: id })
        if (favoriteDelete.affected === 1) {
            return 204
        } else {
            return 404
        }

    }
}
