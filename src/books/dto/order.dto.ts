import { IsIn } from 'class-validator';

export class OrderDto {
  @IsIn(['author', 'alphabetical', 'gender', 'yearOfPublication'])
  order: string;
}