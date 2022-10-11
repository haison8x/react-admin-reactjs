import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('baskets')
export class Basket {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('int', { nullable: false, default: () => 0, name: 'product_id' })
  product_id!: number;

  @Column('int', { nullable: false, default: () => 0, name: 'quantity' })
  quantity!: number;

  @Column('int', { nullable: false, default: () => 0, name: 'command_id' })
  command_id!: number;
}
