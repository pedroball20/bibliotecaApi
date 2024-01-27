import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  findAll() {
    return this.bookRepository.find({});
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOneBy({
      id
    });
    if (!book) throw new NotFoundException(`book with id = ${id} not found`)
    return book;
  }
  async findWithOrder(order: string) {
    let books;

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

  private handleDbExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    console.log(error);
    throw new InternalServerErrorException('Error!.')
  }
}
