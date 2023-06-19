import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../generic/base.entity';
import { User } from '../../user/entity/user.entity';
import { Device } from '../../device/entity/device.entity';

enum OwnershipTypes {
  OWNER = 'owner',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

@Entity({ name: 'device-to-user' })
export class DeviceToUser extends BaseEntity {
  @Column({ type: 'enum', enum: OwnershipTypes, default: OwnershipTypes.OWNER })
  ownerships: OwnershipTypes;

  @ManyToOne(() => User, (user) => user.deviceToUser)
  public user: User;

  @ManyToOne(() => Device, (device) => device.deviceToUser)
  public device: Device;
}
