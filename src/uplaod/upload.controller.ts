import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Delete,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.cloudinaryService.uploadFile(file, 'images');
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }), // 100MB
          new FileTypeValidator({ fileType: /(mp4|mov|avi|mkv)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.cloudinaryService.uploadFile(file, 'videos');
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
      duration: result.duration,
      format: result.format,
    };
  }

  @Delete()
  async deleteFile(
    @Body('publicId') publicId: string,
    @Body('resourceType') resourceType: 'image' | 'video' = 'image',
  ) {
    await this.cloudinaryService.deleteFile(publicId, resourceType);
    return { message: 'File deleted successfully' };
  }
}