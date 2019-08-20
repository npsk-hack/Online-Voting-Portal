import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import {existsSync, mkdirSync} from "fs";

@Controller('api/v1/file-upload')
export class FileUploadController {
    SERVER_URL: string = "http://localhost:3000/";

    constructor() {}

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            filename: (req, file, cb) => {
                return cb(null, file.originalname)
            },
            destination: (req: any, file: any, cb: any) => {
                let uploadPath = './uploads';
                if(req.query.context == 'voter-image') {
                    uploadPath = './uploads/voter';
                }else if(req.query.context == 'candidate-image') {
                    uploadPath = './uploads/candidates';
                }else if(req.query.context == 'party-image') {
                    uploadPath = './uploads/party-image';
                }else if (req.query.context == 'campaign-image') {
                    uploadPath = './uploads/campaign-image';
                }

                if(!existsSync(uploadPath)) {
                    mkdirSync(uploadPath);
                }

                cb(null, uploadPath)
            }
        })
        })
    )
    async uploadFile(@UploadedFile() file) {
        return `${this.SERVER_URL}${file.path}`;
    }
}
