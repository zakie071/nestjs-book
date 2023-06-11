import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/books.schema';
import { User } from 'src/auth/schemas/user.schema';

export class updateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(Category, { message: ' Please enter a correct a category!' })
  readonly category: Category;

  @IsEmpty({message:'You cannot add userId to this field'})
  readonly user: User;
}
