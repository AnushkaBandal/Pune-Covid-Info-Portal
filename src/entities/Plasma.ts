import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Plasma extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  hosp_Name!: string;

  @Field()
  @Column({ unique: true })
  phone_no!: string;

  @Field()
  @Column({ unique: true })
  mail_id!: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp',nullable: true })
  createdAt: Date;

  @Field()
  @Column({ unique: true })
  location!: string;

  @Field()
  @Column()
  address!: string;

  @Field(() => [String])
	@Column({ type: "text", array: true, nullable: true })
	blood_grp: string[];
}
