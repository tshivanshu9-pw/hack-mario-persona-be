import { Inject, Injectable } from '@nestjs/common';
import { Content } from './schema/contents.schema';
import { BaseRepository } from 'src/common/base-repository/types/base-repo.interface';
import { Types } from 'mongoose';
import { ContentReportsService } from '../content-reports/content-reports.service';
import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';
import { PromptFormat } from 'src/common/constant';
import { GenerateContentDto, GenerateImageDto } from './dto/contents.dto';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import * as fs from 'fs';
import * as path from 'path';
import { InternalApiService } from 'src/common/internal-api/internal-api.service';
import { CredService } from '../cred/cred.service';

@Injectable()
export class ContentsService {
    private readonly client;
    constructor(
        @Inject(Content.name)
        private contentsRepo: BaseRepository<Content>,
        private contentReportService: ContentReportsService,
        private config: ConfigService,
        private readonly internalApiService: InternalApiService, // Assuming you have this service for S3 uploads
        private readonly credService: CredService,

    ) { 
        this.client = new OpenAI({
            apiKey: '304502f4c76949c084c41590b0ef4ee1',
            baseURL: 'https://alakhaieastus2.openai.azure.com/openai/deployments/gpt-4.1',
            defaultQuery: { 'api-version': '2025-01-01-preview' },
            defaultHeaders: { 'api-key': '304502f4c76949c084c41590b0ef4ee1' },
        });

        // this.imageClient = new BedrockRuntimeClient({ 
        //     region: "us-west-2",
        //     credentials: {
        //         accessKeyId: this.config.get("accessKeyId"),
        //         secretAccessKey: this.config.get("secretAccessKey"),
        //         sessionToken: this.config.get("sessionToken")
        //     },
        // });
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

    async generateImageFromPrompt(dto: GenerateImageDto) {
        const command = new InvokeModelCommand({
            contentType: "application/json",
            "accept": "application/json",
            modelId: "amazon.titan-image-generator-v2:0",
            body: JSON.stringify({
                taskType: "TEXT_IMAGE",
                textToImageParams: { text: dto.body },
                imageGenerationConfig: {
                    numberOfImages: 1,
                    quality: "standard",
                    cfgScale: 8.0,
                    height: 512,
                    width: 512,
                    seed: 0,
                },
            })
        });
        const imageClient: any = await this.initializeImageClient();
        const response = await imageClient.send(command);
        const { body, $metadata } = response;

        if ($metadata.httpStatusCode === 200) {
            const textDecoder = new TextDecoder("utf-8");
            const jsonString = textDecoder.decode(body.buffer);
            const parsedData = JSON.parse(jsonString);
            const image = parsedData.images[0];

            const filePath = await this.decodeAndSaveImage(image);
    
            const resp = await this.internalApiService.getFileS3Url(filePath);
            const newContent = await this.contentsRepo.create({
                _id: new Types.ObjectId(),
                title: dto.title,
                body: dto.body,
                tags: dto.tags,
                createdAt: new Date(),
                userId: dto.userId,
                status: 'draft',
                imageUrl: resp?.baseUrl + resp?.key,
            });

            // Push data into content report
            await this.contentReportService.create({
                contentId: newContent._id,
                userId: dto.userId,
                updatedAt: new Date(),
            });
            return resp;
        } else {
            throw new Error(`Error generating image: ${$metadata.httpStatusCode}`);
        }
    }

    async decodeAndSaveImage(base64Image: string, fileName = 'output.png'): Promise<string> {
        try {
            const buffer = Buffer.from(base64Image, 'base64');

            const filePath = path.join('src/common', '..', 'images', fileName);

            // Make sure the 'images' folder exists
            fs.mkdirSync(path.dirname(filePath), { recursive: true });

            fs.writeFileSync(filePath, buffer);

            console.log(`✅ Image saved to ${filePath}`);
            return filePath;
        } catch (err) {
            console.error('❌ Error saving image:', err);
            throw err;
        }
    }

    async initializeImageClient() {
        const credentials: any = await this.credService.fetchOne({ searchParams: { type: 'AWS' } }); // Fetch credentials for AWS from credService
        return new BedrockRuntimeClient({
            region: "us-west-2",
            credentials: {
                accessKeyId: credentials.accessKeyId, // Use the fetched accessKeyId
                secretAccessKey: credentials.secretAccessKey, // Use the fetched secretAccessKey
                sessionToken: credentials.sessionToken, // Use the fetched sessionToken (if available)
            },
        });
    }
}
