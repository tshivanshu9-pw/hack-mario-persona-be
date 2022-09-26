import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { InternalApiService } from './internal-api.service';
import { UserService } from './user.service';
import { VideoService } from './video.service';

@Module({
  providers: [InternalApiService, UserService, VideoService, FileService],
  exports: [InternalApiService, UserService, VideoService, FileService],
})
export class InternalApiModule {}
