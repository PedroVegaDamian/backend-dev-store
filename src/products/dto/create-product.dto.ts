import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsUrl()
  @IsString()
  image: string;

  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;
}
