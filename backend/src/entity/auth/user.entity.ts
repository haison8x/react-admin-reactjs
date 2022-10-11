import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, length: 400, name: 'username' })
  username!: string;

  @Column('varchar', { nullable: false, length: 400, name: 'fullname' })
  fullname!: string;

  @Column('varchar', { nullable: false, length: 400, name: 'password' })
  password!: string;

  @Column('varchar', { nullable: false, length: 40, name: 'role' })
  role!: string;

  @Column('text', { nullable: false, name: 'avatar' })
  avatar!: string;
}
