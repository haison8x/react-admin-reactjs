import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, length: 100, name: 'first_name' })
  first_name!: string;

  @Column('varchar', { nullable: false, length: 100, name: 'last_name' })
  last_name!: string;

  @Column('varchar', { nullable: false, length: 100, name: 'email' })
  email!: string;

  @Column('varchar', { nullable: false, length: 100, name: 'address' })
  address!: string;

  @Column('varchar', { nullable: false, length: 20, name: 'zipcode' })
  zipcode!: string;

  @Column('varchar', { nullable: false, length: 100, name: 'city' })
  city!: string;

  @Column('varchar', { nullable: false, length: 100, name: 'stateAbbr' })
  stateAbbr!: string;

  @Column('varchar', { nullable: false, length: 1000, name: 'avatar' })
  avatar!: string;

  @Column('datetime', { nullable: true, default: () => 'CURRENT_TIMESTAMP', name: 'birthday' })
  birthday!: Date;

  @Column('datetime', { nullable: true, default: () => 'CURRENT_TIMESTAMP', name: 'first_seen' })
  first_seen!: Date;

  @Column('datetime', { nullable: true, default: () => 'CURRENT_TIMESTAMP', name: 'last_seen' })
  last_seen!: Date;

  @Column('bool', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'has_ordered' })
  has_ordered!: boolean;

  @Column('datetime', { nullable: true, default: () => 'CURRENT_TIMESTAMP', name: 'latest_purchase' })
  latest_purchase!: Date;

  @Column('bool', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'has_newsletter' })
  has_newsletter!: boolean;

  @Column('simple-array')
  groups?: string[];

  @Column('int', { nullable: false, default: () => 0, name: 'nb_commands' })
  nb_commands!: number;

  @Column('double', { nullable: false, default: () => 0, name: 'total_spent' })
  total_spent!: number;
}
