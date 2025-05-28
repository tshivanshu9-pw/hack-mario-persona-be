import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes } from 'mongoose';

@Schema()
export class ContentReports {

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  contentId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: Number })
  views?: number;

  @Prop({ type: Number })
  likes?: number;

  @Prop({ type: Number })
  shares?: number;

  @Prop({ type: Number })
  comments?: number;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const ContentReportsSchema = SchemaFactory.createForClass(ContentReports);