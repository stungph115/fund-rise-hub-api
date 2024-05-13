import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';
import { Response } from 'express'


@Controller('user')

export class UserController {
    constructor(private userService: UserService) { }

    @Get('list')
    @UseGuards(JwtAuthGuard)
    @SetMetadata('role', 'admin')
    @SetMetadata('setRole', 'role')
    @SetMetadata('userId', 'userId')
    getUsersList(@Body() role) {
        return this.userService.getUsersList()
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    /* @SetMetadata('role', 'user') */
    getThisUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUser(id)
    }

    @Post()
    addUser(@Body() addUserDto: any) {
        return this.userService.addUser(addUserDto)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @SetMetadata('userId', 'userId')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: any,
    ) {
        return this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @SetMetadata('userId', 'userId')
    deleteUser(@Param('id', ParseIntPipe) id: number, @Body() userId: number) {
        return this.userService.deleteUser()
    }

    @Post('signIn')
    signInUser(
        @Body() signInUserParams: any,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.userService.signInUser(signInUserParams, response)
    }

    @Post('verifSignIn')
    verifSignInUser(
        @Body() signInUserParams: any,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.userService.verifSignInUser(signInUserParams, response)
    }

    @Post('signOut')
    signOutUser(
        @Res({ passthrough: true }) response: Response
    ) {
        return this.userService.signOutUser(response)
    }

    @Post('forgot-password')
    requestPasswordReset(@Body('email') email: string) {
        return this.userService.requestResetPassword()
    }

    @Post('reset-password')
    async resetPassword(@Body() params: any) {
        await this.userService.resetPassword()
    }
}
