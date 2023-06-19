import { Device as Device } from 'src/device/entity/device.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

export enum OwnershipTypes {
  OWNER = 'owner',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}
@Entity({ name: 'device-to-user' })
export class DeviceToUserEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  deviceId: string;

  @Column({ type: 'enum', enum: OwnershipTypes, default: OwnershipTypes.OWNER })
  ownership: OwnershipTypes;

  @ManyToOne(() => User, (user) => user.deviceToUser, {
    cascade: ['insert'],
  })
  public user: User;
  @ManyToOne(() => Device, (device) => device.deviceToUser, {
    onDelete: 'CASCADE',
    eager: true,
  })
  public device: Device;
}
