import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class RATCenter extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  hosp_Name!: string;

  @Field()
  @Column({ unique: true })
  location!: string;

  @Field()
  @Column()
  address!: string;

  @Field(() => String)
  @CreateDateColumn({ nullable: true })
  createdAt: Date;
}
