import { Inject, Injectable } from '@nestjs/common';
import { Content } from './schema/contents.schema';
import { BaseRepository } from 'src/common/base-repository/types/base-repo.interface';
import {Types} from 'mongoose';
import { ContentReportsService } from '../content-reports/content-reports.service';
import openai from 'openai';
import { ConfigService } from '@nestjs/config';
import { GenerateContentDto } from './dto/contents.dto';

@Injectable()
export class ContentsService {
    private readonly client;
    constructor(
        @Inject(Content.name)
        private contentsRepo: BaseRepository<Content>,
        private contentReportService: ContentReportsService,
        private config: ConfigService,

    ) { 
        this.client = new openai.OpenAI({
            apiKey: 'sk-Bhr4NYtvq9n4EOxlvRgoUQ',
            baseURL: 'https://litellm-data.penpencil.co',
        });
    }

    async generateContent(body: GenerateContentDto): Promise<Types.ObjectId> {
        const {userId, title, tags} = body;
        const id = new Types.ObjectId();
        process.nextTick(async () => {
        const messages = [
            {
                role: 'user',
                content: `Generate a detailed article with the title "${title}" and include the following tags: ${tags.join(', ')}.`,
            },
        ];
        
        const response = await this.client.chat.completions.create(
            {
                model: 'gpt-4.1',
                messages,
            },
            // {
            //     extra_body: {
            //         api_key: 'my-bad-key',
            //         api_base: 'https://litellm-dev.direct.fireworks.ai/v1',
            //     },
            // },
        );

        // Extract generated content
        const generatedBody = response.choices[0].message.content;
        const newContent = await this.contentsRepo.create({
            _id: id,
            userId,
            title,
            body: generatedBody.trim(),
            tags,
            status: 'draft',
            createdAt: new Date(),
        });

        // Push data into content report
        await this.contentReportService.create({
            contentId: newContent._id,
            userId,
            updatedAt: new Date(),
        });
    });
        return id;
    }

    async getContentById(id: Types.ObjectId): Promise<Content> {
        return this.contentsRepo.fetchOne({searchParams:{ _id: id }});
    }
}
