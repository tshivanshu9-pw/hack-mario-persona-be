import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
export class HeaderUserDto {
  @IsNotEmpty()
  @IsMongoId()
  user_id: Types.ObjectId;
}

export class HeaderOrganizationDto {
  @IsNotEmpty()
  @IsMongoId()
  organization_id: Types.ObjectId;
}

export class HeaderUserOrganizationDto {
  @IsNotEmpty()
  @IsMongoId()
  organization_id: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  user_id: Types.ObjectId;
}

export class HeaderOrganizationAuthDto extends HeaderOrganizationDto {
  @IsNotEmpty()
  @IsString()
  authorization: string;
}

export class HeaderUserOrganizationAuthDto extends HeaderUserOrganizationDto {
  @IsNotEmpty()
  @IsString()
  authorization: string;
}
