import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account';

@Entity()
export class AuthenticationCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column({ default: false })
  isUsed?: boolean;

  @Column()
  accountId: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column({ nullable: true })
  expiredTime: string;
}
