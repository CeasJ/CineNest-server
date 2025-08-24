import { BaseEntity } from 'src/common/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Profile } from './profile';
import { Role } from './role';
import { UserStatus } from 'src/common/enum';
import { RefreshToken } from './token';

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

  @Column({
    nullable: true,
  })
  roleId: string;

  @ManyToOne(() => Role, (role) => role.account)
  role: Role;

  @Column({
    nullable: true,
  })
  profileId?: string;

  @OneToOne(() => Profile, (profile) => profile.account)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => RefreshToken, (token) => token.account)
  refreshToken: RefreshToken[];
}
