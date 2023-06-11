import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/books.schema';
import mongoose, { Model } from 'mongoose';
import { createBookDto } from './book-Dto/create-book.dto';
import { updateBookDto } from './book-Dto/update-book.dto';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book')
    private readonly bookModel: Model<Book>,
  ) {}

  async getAllBooks(query: Query): Promise<Book[]> {
    // console.log(query);

    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    return await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
  }

  async createBook(book: createBookDto, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });

    return await this.bookModel.create(data);
  }

  async getAbook(id: string): Promise<Book> {
    let foundBook;
    try {
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Please enter a valid mongodb Id');
      }

      foundBook = await this.bookModel.findById(id);
      if (!foundBook) {
        throw new NotFoundException('Book is not found!');
      }
    } catch (error) {
      throw error;
    }
    return foundBook;
  }

  async updateBook(id: string, book: updateBookDto): Promise<Book> {
    // let foundBook;
    const foundBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    try {
      if (!foundBook) {
        throw new NotFoundException('Book is not found!');
      }
    } catch (error) {
      throw new NotFoundException('Book is not found!');
    }
    return foundBook;
  }

  async deleteBook(id: string): Promise<Book[]> {
    let foundBook;
    try {
      const deletedBook = await this.bookModel.findByIdAndDelete(id);
      if (!foundBook) {
        throw new NotFoundException('Book is not found!');
      }
    } catch (error) {
      throw new NotFoundException('Book is not found!');
    }

    return this.bookModel.find();
  }
}
