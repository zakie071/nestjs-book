import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/books.schema';
import { User } from 'src/auth/schemas/user.schema';

export class createBookDto {
  
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: ' Please enter a correct a category!' })
  readonly category: Category;

  @IsEmpty({message:'You cannot add userId to this field'})
  readonly user: User;
}
