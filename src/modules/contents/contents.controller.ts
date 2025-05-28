import { Body, Controller, Post } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { Types } from 'mongoose';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post('generate')
    async generateContent(
        @Body('userId') userId: Types.ObjectId,
        @Body('title') title: string,
        @Body('body') body: string,
        @Body('tags') tags: string[],
    ) {
        const content = await this.contentsService.generateContent(userId, title, tags);
        return { message: 'Content generated successfully', content };
    }
}
