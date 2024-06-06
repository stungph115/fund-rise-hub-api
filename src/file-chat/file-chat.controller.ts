import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { FileChatService } from './file-chat.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';
import { join } from 'path';
import * as fs from 'fs';

@Controller('file-chat')
export class FileChatController {
    constructor(private fileChatService: FileChatService) { }
    @Post()
    @UseGuards(JwtAuthGuard)
    addFile(@Body() addFileDto: any) {
        return this.fileChatService.addFile(addFileDto)

    }

    @Get(':filename')
    async seeUploadedFile(@Param('filename') filename, @Res() res): Promise<any> {
        try {
            const filePath = join(process.cwd(), '/public', filename);

            // Check if the file exists before sending
            if (fs.existsSync(filePath)) {
                return res.sendFile(filePath);
            } else {
                return res.status(404).send('File not found');
            }
        } catch (error) {
            console.error("Error while sending file:", error);
            return res.status(500).send('Internal server error');
        }
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    setMessageRead(@Param('id', ParseIntPipe) fileId: number) {
        return this.fileChatService.setFileRead(fileId)
    }
}
