import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { Types } from 'mongoose';
import { GenerateContentDto, GenerateImageDto, IdDto } from './dto/contents.dto';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post('generate')
    async generateContent(
        @Body() body: GenerateContentDto
    ) {
        const content = await this.contentsService.generateContent(body);
        return { message: 'Content generated successfully', content };
    }

    @Get(':id')
    async getContentById(@Param() Param: IdDto) {
        return this.contentsService.getContentById(Param.id);
    }

    @Post('generate-image')
    async generateImage(@Body() dto: GenerateImageDto) {
        return this.contentsService.generateImageFromPrompt(dto);
    }
}
