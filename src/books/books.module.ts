import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { StatisticsController } from './statistics.controller';

@Module({
  controllers: [BooksController, StatisticsController],
  providers: [BooksService],
  imports: [
    TypeOrmModule.forFeature([Book])
  ]
})
export class BooksModule { }
