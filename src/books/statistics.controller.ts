import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, BadRequestException } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('Statistics')
export class StatisticsController {
  constructor(private readonly booksService: BooksService) { }


  @Get('get')
  getStatistics(
    @Query('type') type: string,
    @Query('popularity') popularity: string,    
    ) {
      if (!['author', 'book'].includes(type)) {
        throw new BadRequestException('Invalid type parameter');
      }
  
      if (!['Alta', 'Media', 'Baja'].includes(popularity)) {
        throw new BadRequestException('Invalid popularity parameter');
      }
    return this.booksService.getStatistics(type ,popularity);
  }
}
