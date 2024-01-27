import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class BooksService {
  private readonly logger = new Logger('BooksService');

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>

  ) { }
  async create(createBookDto: CreateBookDto) {
    try {
      const book = this.bookRepository.create(createBookDto);
      await this.bookRepository.save(book);
      return book;
    } catch (error) {
      this.handleDbExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.bookRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOneBy({
      id
    });
    if (!book) throw new NotFoundException(`book with id = ${id} not found`)
    return book;
  }
  async findWithOrder(orderDto: OrderDto) {
    let books;
    const { order } = orderDto
    switch (order) {
      case 'author':
        books = await this.bookRepository.find({ order: { author: 'ASC' } });
        break;
      case 'alphabetical':
        books = await this.bookRepository.find({ order: { title: 'ASC' } });
        break;
      case 'gender':
        books = await this.bookRepository.find({ order: { gender: 'ASC' } });
        break;
      case 'yearOfPublication':
        books = await this.bookRepository.find({ order: { yearOfPublication: 'ASC' } });
        break;
      default:
        books = await this.bookRepository.find();
        break;
    }

    return books;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async remove(id: string) {
    const book = await this.findOne(id)

    await this.bookRepository.remove(book)
  }
  async getStatistics(type: string, popularity: string) {
    let result;

    switch (type) {
      case 'author':
        result = await this.bookRepository.findBy({
          authorPopularity: popularity
        });
        break;
      case 'book':
        result = await this.bookRepository.findBy({
          bookPopularity: popularity
        });
        break;
      default:
        throw new Error('Invalid type');
    }

    return result;
  }

  private handleDbExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    console.log(error);
    throw new InternalServerErrorException('Error!.')
  }
}
