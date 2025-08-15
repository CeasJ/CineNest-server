import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account';

export class AuthenticationCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column({ default: false })
  isUsed?: boolean;

  @Column()
  accountId: string;

  @Column({ nullable: true })
  expiredTime: string;
}
