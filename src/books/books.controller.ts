import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { createBookDto } from './book-Dto/create-book.dto';
import { Book } from './schemas/books.schema';
import { updateBookDto } from './book-Dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async findAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return await this.bookService.getAllBooks(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBook(@Body() book: createBookDto, @Req() req ):Promise<Book> {
    
    
    return await this.bookService.createBook(book,req.user);
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
