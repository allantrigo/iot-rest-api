import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../generic/base.entity';
import { DeviceToUser } from '../../device-to-user/entity/device-to-user.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  firstName: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @OneToMany(() => DeviceToUser, (deviceToUser) => deviceToUser.user)
  public deviceToUser: DeviceToUser[];
}
