import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'video/mp4'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.mp4'];
const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  @Post('media')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Subir imagen (jpg, png) o video (mp4)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'media'),
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname).toLowerCase();
          cb(null, `${randomUUID()}${ext}`);
        },
      }),
      limits: { fileSize: MAX_SIZE_BYTES },
      fileFilter: (_req, file, cb) => {
        const ext = extname(file.originalname).toLowerCase();
        if (
          ALLOWED_MIME_TYPES.includes(file.mimetype) &&
          ALLOWED_EXTENSIONS.includes(ext)
        ) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              'Solo se permiten imágenes (jpg, png) y videos (mp4)',
            ),
            false,
          );
        }
      },
    }),
  )
  uploadMedia(@UploadedFile() file: Express.Multer.File): {
    url: string;
    type: 'image' | 'video';
  } {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }
    const type: 'image' | 'video' = file.mimetype.startsWith('image/')
      ? 'image'
      : 'video';
    return { url: `/uploads/media/${file.filename}`, type };
  }
}
