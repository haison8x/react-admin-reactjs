import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('datetime', { nullable: true, default: () => 'CURRENT_TIMESTAMP', name: 'date' })
  date!: Date;

  @Column('int', { nullable: true, default: () => 0, name: 'command_id' })
  command_id!: number;

  @Column('int', { nullable: true, default: () => 0, name: 'customer_id' })
  customer_id!: number;
  
  @Column('double', { nullable: true, default: () => 0, name: 'total_ex_taxes' })
  total_ex_taxes!: number;

  @Column('double', { nullable: true, default: () => 0, name: 'delivery_fees' })
  delivery_fees!: number;

  @Column('double', { nullable: true, default: () => 0, name: 'tax_rate' })
  tax_rate!: number;

  @Column('double', { nullable: true, default: () => 0, name: 'taxes' })
  taxes!: number;

  @Column('double', { nullable: true, default: () => 0, name: 'total' })
  total!: number;
}
