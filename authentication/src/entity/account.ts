import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;
}
