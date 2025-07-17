import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Profile } from './profile';
import { Role } from './role';
import { UserStatus } from 'src/common/enum';

@Entity()
export class Account extends BaseEntity {
  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ enum: UserStatus, default: UserStatus.NOT_ACTIVE })
  active: UserStatus;

  @OneToOne(() => Profile, (profile) => profile.account)
  profile: Profile;

  @ManyToOne(() => Role, (Role) => Role.account)
  Role: Role;
}
