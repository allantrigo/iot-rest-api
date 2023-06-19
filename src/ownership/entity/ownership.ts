import { Device as Device } from 'src/device/entity/device.entity';
import { BaseEntity } from 'src/generic/base.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum OwnershipTypes {
  OWNER = 'owner',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}
@Entity({ name: 'ownership' })
export class Ownership extends BaseEntity {
  constructor(user?: User, device?: Device, ownership?: OwnershipTypes) {
    super();
    this.device = device;
    this.user = user;
    this.ownership = ownership;
  }
  @Column({ type: 'enum', enum: OwnershipTypes, default: OwnershipTypes.OWNER })
  ownership: OwnershipTypes;

  @ManyToOne(() => User, (user) => user.ownership)
  public user: User;

  @ManyToOne(() => Device, (device) => device.ownerships, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
  })
  public device: Device;
}
