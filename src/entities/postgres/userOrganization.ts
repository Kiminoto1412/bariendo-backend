import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user';
import { Organization } from './organization';

@Entity({ name: 'user_organization' })
export class UserOrganization extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at' })
  deletedAt: Date

  @ManyToOne(() => User, user => user.userOrganizations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Organization, organization => organization.userOrganizations)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
}
