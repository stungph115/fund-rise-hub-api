import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Project } from 'src/project/project.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Project) private projectRepository: Repository<Project>,

    ) { }
    async addComment(params: any) {
        const project = await this.projectRepository.findOneBy({ id: params.projectId })
        if (!project) {
            throw new HttpException('PROJECT_NOT_FOUND', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const user = await this.userRepository.findOneBy({ id: params.userId })
        if (!user) {
            throw new HttpException('USER_NOT_FOUND', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newComment = this.commentRepository.create({
            project: project,
            sender: user,
            content: params.content,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const commentSaved = await this.commentRepository.save(newComment)
        if (!commentSaved) {
            throw new HttpException('ERROR_COMMENT_SAVE', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return 201
    }
    async deleteComment(idComment) {
        const comment = await this.commentRepository.findOneBy({ id: idComment })
        if (!comment) {
            throw new HttpException('COMMENT_NOT_FOUND', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const commentDelete = await this.commentRepository.delete(comment)
        if (!commentDelete) {
            throw new HttpException('ERROR_COMMENT_DELETION', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return 200
    }

}
