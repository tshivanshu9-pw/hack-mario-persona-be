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
    tags: any[];
}

export class IdDto {
    @IsNotEmpty()
    id: Types.ObjectId;
}

export class TagImageDto {
  @IsOptional()
  header_1: string;

  @IsOptional()
  header_2: string;

  @IsOptional()
  batch_name: string;

  @IsOptional()
  class_details: string;

  @IsOptional()
  price: string;

  @IsNotEmpty()
  template: string;
}

export class GenerateImageDto {
  @IsNotEmpty()
  body: string;
  
  @IsOptional()
  tags?: TagImageDto[];

  @IsOptional()
  title?: string;

  @IsOptional()
  userId?: Types.ObjectId;
}