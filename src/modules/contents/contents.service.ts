import { Inject, Injectable } from '@nestjs/common';
import { Content } from './schema/contents.schema';
import { BaseRepository } from 'src/common/base-repository/types/base-repo.interface';
import { Types } from 'mongoose';
import { ContentReportsService } from '../content-reports/content-reports.service';
import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';
import { PromptFormat } from 'src/common/constant';
import { GenerateContentDto, GenerateImageDto } from './dto/contents.dto';
import { TemplateMapper } from './mapper/template.mapper';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { fromIni } from "@aws-sdk/credential-providers";

@Injectable()
export class ContentsService {
    private readonly client;
    private readonly imageClient;
    constructor(
        @Inject(Content.name)
        private contentsRepo: BaseRepository<Content>,
        private contentReportService: ContentReportsService,
        private config: ConfigService,

    ) { 
        this.client = new OpenAI({
            apiKey: '304502f4c76949c084c41590b0ef4ee1',
            baseURL: 'https://alakhaieastus2.openai.azure.com/openai/deployments/gpt-4.1',
            defaultQuery: { 'api-version': '2025-01-01-preview' },
            defaultHeaders: { 'api-key': '304502f4c76949c084c41590b0ef4ee1' },
        });

        this.imageClient = new BedrockRuntimeClient({ 
            region: "us-west-2",
            credentials: fromIni({ profile: 'default' }),
        });
    }

    async generateContent(body: GenerateContentDto): Promise<Types.ObjectId> {
        const {userId, title, tags} = body;
        const id = new Types.ObjectId();
        const generateDynamicPrompt = (tags: any[]): string => {
            let dynamicPrompt = PromptFormat;
    
            // Loop through each tag object in the tags array
            tags.forEach((tag) => {
                Object.keys(tag).forEach((key) => {
                    // Construct the placeholder format
                    const placeholder = `{{ ${key} }}`;
    
                    // Replace the placeholder with the actual value
                    if (dynamicPrompt.includes(placeholder)) {
                        dynamicPrompt = dynamicPrompt.replace(new RegExp(placeholder, 'g'), tag[key]);
                    }
                });
            });
    
            return dynamicPrompt;
        };
        
        process.nextTick(async () => {
        const messages = [
            {
                role: 'system',
                content: 'You are a creative copywriter at a leading Indian EdTech company'
            },
            {
                role: 'user',
                content: generateDynamicPrompt(tags),
            },
            // {
            //     role: 'system',
            //     content: PromptFormat,
            // }
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

        // console.log({
        //     message: 'Content generated successfully',
        //     dbResponse: res,
        //     openAIResponse: response,
        // });
    });
        return id;
    }

    async getContentById(id: Types.ObjectId): Promise<Content> {
        return this.contentsRepo.fetchOne({searchParams:{ _id: id }});
    }

    generateDynamicPrompt(templateString: string, values: GenerateImageDto): string {
        let result = templateString;
        Object.keys(values).forEach(key => {
            const placeholder = `{{ ${key} }}`;
            result = result.replace(new RegExp(placeholder, 'g'), values[key]);
        });
        return result;
    }

    async generateImageFromPrompt(dto: GenerateImageDto) {
        const tempString = new TemplateMapper().mapTemplate(dto.template);
        const prompt = this.generateDynamicPrompt(tempString, dto);
        const body = {
            prompt: prompt,
            max_tokens_to_sample: 1024,
            temperature: 0.7,
            anthropic_version: "bedrock-2023-05-31"
            // Add other Claude-3 parameters as needed
        };

        const command = new InvokeModelCommand({
            modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify(body),
        });

        const response = await this.imageClient.send(command);
        console.log("🚀 ~ ContentsService ~ generateImageFromPrompt ~ response:", response)
        const result = JSON.parse(new TextDecoder().decode(response.body));
        return result.completion;
    }
}
