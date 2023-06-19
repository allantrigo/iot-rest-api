import { Ownership as Ownership } from 'src/ownership/entity/ownership';
import { BaseEntity } from 'src/generic/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  firstName: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @OneToMany(() => Ownership, (ownership) => ownership.user, {
    onDelete: 'CASCADE',
    cascade: ['insert'],
  })
  public ownership: Ownership[];
}
