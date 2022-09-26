import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export const DEFAULT__PAGE_LIMIT = 10;
export const DEFAULT_PAGE = 0;
export const DEFAULT_SKIP = 0;

export class PageLimitDto {
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  page?: number = DEFAULT_PAGE;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  limit?: number = DEFAULT__PAGE_LIMIT;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  skip?: number = DEFAULT_SKIP;
}
