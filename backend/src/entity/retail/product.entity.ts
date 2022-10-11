import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('int', { nullable: true, default: () => 0, name: 'category_id' })
  category_id!: number;

  @Column('varchar', { nullable: false, length: 1000, name: 'reference' })
  reference!: string;

  @Column('double', { nullable: true, default: () => 0, name: 'width' })
  width!: number;

  @Column('double', { nullable: true, default: () => 0, name: 'height' })
  height!: number;

  @Column('double', { nullable: true, default: () => 0, name: 'price' })
  price!: number;

  @Column('varchar', { nullable: false, length: 400, name: 'thumbnail' })
  thumbnail!: string;

  @Column('varchar', { nullable: false, length: 400, name: 'image' })
  image!: string;

  @Column('varchar', { nullable: false, length: 400, name: 'description' })
  description!: string;

  @Column('int', { nullable: true, default: () => 0, name: 'stock' })
  stock!: number;

  @Column('int', { nullable: true, default: () => 0, name: 'sales' })
  sales!: number;  
}
