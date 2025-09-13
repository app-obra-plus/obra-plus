import { put, del} from '@vercel/blob';
import { Readable } from 'stream';
import { BadRequestError } from '../../exception/BadRequestError';

const { v4: uuidv4 } = require('uuid');

export class ImageService {

    private readonly BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

    async upload (file: Express.Multer.File){

        if(!file){
            throw new BadRequestError('Nenhum arquivo foi enviado');
        }

        const stream = Readable.from(file.buffer);
        const extension = file.originalname.split('.').pop();
        const filename = `${uuidv4()}.${extension}`;

        const blob = await put(`images/${filename}`, stream, {
            access: 'public',
            token: this.BLOB_READ_WRITE_TOKEN
        });

        return blob;
    }

    async deleteBlob(pathname: string) {
        await del(pathname, {
            token: this.BLOB_READ_WRITE_TOKEN
        });
    }
}