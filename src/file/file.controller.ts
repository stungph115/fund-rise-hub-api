import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('file')
export class FileController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './src/public/',
            filename: (req, file, callback) => {
                const originalName = file.originalname;
                const extension = path.extname(originalName);
                const newName = originalName.substring(0, Math.min(5, originalName.length)) + '_' + Date.now() + extension;
                callback(null, newName);
            },
        }),
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return file.filename
    }

    @Get(':filename')
    async serveImage(@Param('filename') filename: string, @Res() res: Response) {
        const imagePath = path.join(__dirname, '..', '..', '..', 'src', 'public', filename); // Adjust the path as needed
        if (fs.existsSync(imagePath)) {
            return res.sendFile(imagePath);
        } else {
            return res.status(404).send('Image not found');
        }
    }
}