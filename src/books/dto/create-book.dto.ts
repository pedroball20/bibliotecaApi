import { IsIn, IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @MinLength(5)
    urlImg: string;

    @IsIn([
        "Novela",
        "Poesía",
        "Drama",
        "Ciencia ficción",
        "Fantasía",
        "Misterio",
        "Thriller",
        "Romance",
        "Histórica",
        "Aventura"
    ])
    gender: string;

    @IsString()
    @MinLength(1)
    author: string;

    @IsIn(['Alta', 'Media', 'Baja'])
    authorPopularity: string;

    @IsIn(['Alta', 'Media', 'Baja'])
    bookPopularity: string;

    @IsPositive()
    @IsInt()
    yearOfPublication: number

}