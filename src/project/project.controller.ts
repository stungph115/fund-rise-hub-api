import { Controller, Post, Get, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto, FindProjectDto } from './project.dto';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async addProject(@Body() projectDto: CreateProjectDto) {
        return this.projectService.addProject(projectDto);

    }

    @Get(':id')
    getProject(@Param('id') projectId: number) {
        return this.projectService.getProject(projectId);

    }

    @Get('admin')
    @UseGuards(JwtAuthGuard)
    async getProjectsAdmin() {
        try {
            const projects = await this.projectService.getProjectsAdmin();
            return { projects };
        } catch (error) {
            return { error: 'Failed to fetch projects' };
        }
    }

    @Get('discover')
    async discoverProjects(@Query() queryParams: FindProjectDto) {
        try {
            const projects = await this.projectService.discoverProjects(queryParams);
            return { projects };
        } catch (error) {
            return { error: 'Failed to discover projects' };
        }
    }

    @Post(':id/update')
    @UseGuards(JwtAuthGuard)
    async updateProject(@Param('id') projectId: number, @Body() updateParams: UpdateProjectDto) {
        try {
            const updatedProject = await this.projectService.updateProject(projectId, updateParams);
            return { updatedProject };
        } catch (error) {
            return { error: 'Failed to update project' };
        }
    }
}
