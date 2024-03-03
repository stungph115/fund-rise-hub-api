import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SetMetadata('role', 'admin')
    @SetMetadata('userId', 'userId')
    getRole(@Body() userId) {
        return this.roleService.getRole()
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @SetMetadata('role', 'admin')
    @SetMetadata('userId', 'userId')
    addRole(@Body() userId) {
        return this.roleService.addRole()
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @SetMetadata('role', 'admin')
    @SetMetadata('userId', 'userId')
    updateRole(@Body() userId, @Param('id', ParseIntPipe) id: number,) {
        return this.roleService.updateRole()
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @SetMetadata('role', 'admin')
    @SetMetadata('userId', 'userId')
    deleteRole(@Body() userId, @Param('id', ParseIntPipe) id: number,) {
        return this.roleService.deleteRole()
    }

}
