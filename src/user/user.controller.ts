import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';
import { Response } from 'express'


@Controller('user')

export class UserController {
    constructor(private userService: UserService) { }
    //admin
    @Get('list/:search')
    @UseGuards(JwtAuthGuard)
    getUsersList(@Param('search') search: string) {
        return this.userService.findUser(search)
    }
    //find users
    @Post('find')
    getUsersListFound(@Body() role) {
        return this.userService.getUsersList()
    }
    //profile
    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    getThisUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUser(id)
    }

    @Post()
    addUser(@Body() addUserDto: any) {
        return this.userService.addUser(addUserDto)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: any,
    ) {
        return this.userService.updateUser(id, updateUserDto)
    }
    //admin
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
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
    requestPasswordReset(@Body() email: any) {
        return this.userService.requestResetPassword(email.email)
    }

    @Post('reset-password')
    async resetPassword(@Body() params: any) {
        await this.userService.resetPassword(params)
    }
    @Post('change-password')
    async changePassword(@Body() params: any) {
        await this.userService.changePassword(params)
    }
}