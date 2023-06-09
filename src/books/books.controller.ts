import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { createBookDto } from './book-Dto/create-book.dto';
import { Book } from './schemas/books.schema';
import { updateBookDto } from './book-Dto/update-book.dto';
import { Query as ExpressQuery} from 'express-serve-static-core';


@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async findAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return await this.bookService.getAllBooks(query);
  }

  @Post()
  async createBook(@Body() book: createBookDto): Promise<Book> {
    return await this.bookService.createBook(book);
  }

  @Get(':id')
  async findABook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.getAbook(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') bookId: string,
    @Body() book: updateBookDto,
  ): Promise<Book> {
    return await this.bookService.updateBook(bookId, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') bookId: string): Promise<Book[]> {
    return await this.bookService.deleteBook(bookId);
  }
}
