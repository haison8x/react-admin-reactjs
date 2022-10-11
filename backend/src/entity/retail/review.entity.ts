import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('datetime', { nullable: true, default: () => 'CURRENT_TIMESTAMP', name: 'date' })
  date!: Date;

  @Column('varchar', { nullable: false, length: 40, name: 'status' })
  status!: string;

  @Column('int', { nullable: true, default: () => 0, name: 'command_id' })
  command_id!: number;

  @Column('int', { nullable: true, default: () => 0, name: 'product_id' })
  product_id!: number;

  @Column('int', { nullable: true, default: () => 0, name: 'customer_id' })
  customer_id!: number;

  @Column('int', { nullable: true, default: () => 0, name: 'rating' })
  rating!: number;

  @Column('varchar', { nullable: false, length: 4000, name: 'comment' })
  comment!: string;  
}
