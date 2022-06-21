import { Module } from '@nestjs/common';
import { InternalApiService } from './internal-api.service';
import { UserService } from './user.service';
import { VideoService } from './video.service';
@Module({
  providers: [InternalApiService, UserService, VideoService],
  exports: [InternalApiService, UserService, VideoService],
})
export class InternalApiModule {}
