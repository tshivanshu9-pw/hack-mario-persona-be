import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds `createdAt` and `updatedAt` fields
export class Cred extends Document {
  @Prop({ required: true })
  apiKey: string;

  @Prop({ required: true })
  accessKeyId: string;

  @Prop({ required: false })
  secretAccessKey: string; 

  @Prop({ default: false })
  sessionToken: boolean; 
  @Prop()
  description?: string;

  @Prop({type: String})
  type: string
}

export const CredSchema = SchemaFactory.createForClass(Cred);