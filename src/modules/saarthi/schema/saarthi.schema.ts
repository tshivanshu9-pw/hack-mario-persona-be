import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes } from 'mongoose';
import {
  ClassEnum,
  ExamEnum,
  SaarthiStatusEnum,
  VideoTypeEnum,
} from '../saarthi.enum';

@Schema({ _id: false })
export class SaarthiLabel {
  @Prop({ trim: true, required: true, type: String })
  title: string;

  @Prop({ trim: true, required: true, type: SchemaTypes.ObjectId })
  image_id: Types.ObjectId;

  @Prop({ trim: true, required: true, type: String })
  description: string;
}
export const SaarthiLabelSchema = SchemaFactory.createForClass(SaarthiLabel);

@Schema({ _id: false })
export class MentorsMetadata {
  @Prop({ trim: true, required: true, type: SchemaTypes.ObjectId })
  image_id: Types.ObjectId;

  @Prop({ trim: true, required: true, type: String })
  name: string;

  @Prop({ trim: true, required: true, type: String })
  college: string;
}
export const MentorsMetadataSchema =
  SchemaFactory.createForClass(MentorsMetadata);

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'saarthis',
})
export class Saarthi {
  @Prop({
    trim: true,
    required: false,
    type: String,
    enum: SaarthiStatusEnum,
    default: 'Active',
  })
  status?: SaarthiStatusEnum;

  @Prop({ trim: true, required: true, type: SchemaTypes.ObjectId })
  organization_id: Types.ObjectId;

  @Prop({ trim: true, required: true, type: SchemaTypes.ObjectId })
  created_by: Types.ObjectId;

  @Prop({ trim: true, required: true, type: String })
  title: string;

  @Prop({ trim: true, required: true, type: String })
  description: string;

  @Prop({ required: true, type: [String], enum: ExamEnum })
  exams: ExamEnum[];

  @Prop({ trim: true, required: true, type: Boolean })
  enable_doubt: boolean;

  @Prop({ trim: true, required: true, type: Boolean })
  enable_concept: boolean;

  @Prop({ trim: true, required: true, type: Boolean })
  enable_planner: boolean;

  @Prop({ required: true, type: [String], enum: ClassEnum })
  classes: ClassEnum[];

  @Prop({ required: true, type: [SaarthiLabelSchema] })
  label_1: SaarthiLabel[];

  @Prop({ trim: true, required: true, type: String })
  video_url: string;

  @Prop({ trim: true, required: true, type: String, enum: VideoTypeEnum })
  video_type: VideoTypeEnum;

  @Prop({ required: true, type: [SaarthiLabelSchema] })
  label_2: SaarthiLabel[];

  @Prop({ required: true, type: [MentorsMetadataSchema] })
  mentors_metadata: MentorsMetadata[];

  @Prop({ trim: true, required: true, type: SchemaTypes.ObjectId })
  faq_cat_id: Types.ObjectId;

  @Prop({ trim: true, required: false, type: String })
  slug?: string;

  @Prop({ trim: true, required: false, type: String })
  message?: string;
}
export const SaarthiSchema = SchemaFactory.createForClass(Saarthi);
