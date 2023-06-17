import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DeviceToUser } from './device-to-user.entity';

@Entity({ name: 'device' })
export class Device extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'varchar', length: 100 })
  local: string;

  @OneToMany(() => DeviceToUser, (deviceToUser) => deviceToUser.device)
  public deviceToUser: DeviceToUser[];
}
