import { Types } from 'mongoose';

export type CreateUserData = {
  firstName: string;
  lastName: string;
  primaryNumber: string; //userName
  email: string;
  password: string;
  type: 'ADMIN' | 'TEACHER' | 'PARENT' | 'MENTOR' | 'STUDENT';
  organization: Types.ObjectId; //as a header
  status: 'Active' | 'Inactive';
  imageId?: Types.ObjectId;
};
export type UpdateUserData = {
  firstName: string;
  lastName: string;
  primaryNumber: string;
  email: string;
  type: 'ADMIN' | 'TEACHER' | 'PARENT' | 'MENTOR' | 'STUDENT';
  status: 'Active' | 'Inactive';
  imageId?: Types.ObjectId;
};
