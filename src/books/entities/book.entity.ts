import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique:true,
    })
    title:string;
    
    @Column('text')
    description:string;
    
    @Column('text')
    urlImg:string;
    
    @Column('text')
    gender:string;
    
    @Column('text')
    author:string;

    @Column('text')
    authorPopularity:string;
    
    @Column('text')
    bookPopularity:string;

    @Column('numeric', {
        nullable: false
    })
    yearOfPublication:number;
}
