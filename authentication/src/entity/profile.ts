import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Account } from './account';

@Entity()
export class Profile extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  gender: number;

  @Column({
    nullable: true,
  })
  accountId?: string;

  @OneToOne(() => Account, (account) => account.profile)
  account: Account;
}
