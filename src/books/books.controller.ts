import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, BadRequestException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { OrderDto } from './dto/order.dto';
import { ValidRoles } from 'src/login/interfaces';
import { Auth } from 'src/login/decorators';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post('/add')
  @Auth(ValidRoles.publicador)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('read')
  findWithOrder(@Query() orderDto: OrderDto) {
    return this.booksService.findWithOrder(orderDto);
  }

  //paginado
  @Get('/read/get')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.booksService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksService.remove(id);
  }
}
