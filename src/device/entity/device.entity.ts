import { Ownership } from 'src/ownership/entity/ownership';
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

  @OneToMany(() => Ownership, (ownership) => ownership.device, {
    cascade: ['remove'],
  })
  public ownerships: Ownership[];
}
