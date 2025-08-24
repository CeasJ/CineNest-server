import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, (account) => account.refreshToken)
  account: Account;

  @Column({ unique: true })
  token: string;
}
