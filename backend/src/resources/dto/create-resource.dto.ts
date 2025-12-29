import {
  IsString,
  IsOptional,
  IsInt,
  IsIn,
  MinLength,
  Min,
} from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @MinLength(1)
  category: string;

  @IsString()
  @IsIn(['active', 'inactive', 'archived'])
  @IsOptional()
  status?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  priority?: number;
}
