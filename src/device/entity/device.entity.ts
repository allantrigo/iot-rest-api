import { DeviceToUserEntity } from 'src/device-to-user/entity/device-to-user.entity';
import { BaseEntity as GenericEntity } from 'src/generic/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'device' })
export class Device extends GenericEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'varchar', length: 100 })
  local: string;

  @OneToMany(() => DeviceToUserEntity, (deviceToUser) => deviceToUser.device, {
    cascade: ['insert'],
  })
  public deviceToUser: DeviceToUserEntity[];
}
