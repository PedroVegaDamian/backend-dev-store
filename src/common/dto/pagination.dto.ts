import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @Min(1)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  offset?: number;
}
