import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Account } from './account';
import { UserRole } from 'src/common/enum';

@Entity()
export class Role extends BaseEntity {
  @Column({ enum: UserRole })
  name: UserRole;

  @OneToMany(() => Account, (account) => account.Role)
  account: Account;
}
