import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes } from 'mongoose';

@Schema()
export class Content {

  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  body: string;

  @Prop({ type: [String]})
  tags: string[];

  @Prop({ type: String, enum: ['draft', 'published'] })
  status: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Date, required: false })
  updatedAt?: Date;
}

export const ContentSchema = SchemaFactory.createForClass(Content);