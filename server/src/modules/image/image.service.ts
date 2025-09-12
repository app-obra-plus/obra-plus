import { put } from '@vercel/blob';
import { Readable } from 'stream';
import { BadRequestError } from '../../exception/BadRequestError';


export class ImageService {

    async upload (file: Express.Multer.File){

        if(!file){
            throw new BadRequestError('Nenhum arquivo foi enviado');
        }

        const stream = Readable.from(file.buffer);

        const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

        const blob = await put(`images/${Date.now()}-${file.originalname}`, stream, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });

        return blob;
    }
}