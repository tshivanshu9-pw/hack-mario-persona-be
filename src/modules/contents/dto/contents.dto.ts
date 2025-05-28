import { Types } from 'mongoose';
import { IsString, IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class GenerateContentDto {
    @IsOptional()
    userId: Types.ObjectId;

    @IsString()
    @IsOptional()
    title: string;

    @IsOptional()
    body: string

    @IsOptional()
    @IsArray()
    tags: string[];
}

export class IdDto {
    @IsNotEmpty()
    id: Types.ObjectId;
}