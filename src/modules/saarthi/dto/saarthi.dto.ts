import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsEnum,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type, Transform, TransformFnParams } from 'class-transformer';
import { Types } from 'mongoose';
import {
  ExamEnum,
  ClassEnum,
  VideoTypeEnum,
  SaarthiStatusEnum,
} from 'src/modules/saarthi/saarthi.enum';
import {
  SaarthiLabel,
  MentorsMetadata,
} from 'src/modules/saarthi/schema/saarthi.schema';
import { IsVideoUrl } from 'src/common/decorators/video-url.decorator';

export class SaarthiLabelDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  title: string;

  @IsNotEmpty()
  @IsMongoId()
  image_id: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;
}

export class MentorsMetadataDto {
  @IsNotEmpty()
  @IsMongoId()
  image_id: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  college: string;
}

export class SaarthiDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  title: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;

  @IsNotEmpty()
  @IsEnum(ExamEnum, { each: true })
  exams: ExamEnum[];

  @IsNotEmpty()
  @IsBoolean()
  enable_doubt: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enable_concept: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enable_planner: boolean;

  @IsNotEmpty()
  @IsEnum(ClassEnum, { each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v: ClassEnum) => {
        if (v == ClassEnum.twelvePlus2) return ClassEnum.twelvePlus;
        return v;
      });
    } else {
      if (value == ClassEnum.twelvePlus2) return ClassEnum.twelvePlus;
      return value;
    }
  })
  classes: ClassEnum[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SaarthiLabelDto)
  label_1: SaarthiLabel[];

  @IsNotEmpty()
  @IsVideoUrl('video_type')
  video_url: string;

  @IsNotEmpty()
  @IsEnum(VideoTypeEnum)
  video_type: VideoTypeEnum;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SaarthiLabelDto)
  label_2: SaarthiLabel[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MentorsMetadataDto)
  mentors_metadata: MentorsMetadata[];

  @IsNotEmpty()
  @IsMongoId()
  faq_cat_id: Types.ObjectId;

  @IsOptional()
  @IsEnum(SaarthiStatusEnum)
  status?: SaarthiStatusEnum;

  @IsOptional()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  message?: string;
}

export class SaarthiIdParam {
  @IsMongoId()
  saarthi_id: string;
}
