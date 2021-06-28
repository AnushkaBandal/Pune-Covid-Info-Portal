
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Beds extends BaseEntity{
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
  @Column()
  address!: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp',nullable: true })
  createdAt: Date;

  @Field()
  @Column()
  location!: string;

  @Field()
  @Column()
  with_oxygen!: number;

  @Field()
  @Column()
  without_oxygen!: number;

  @Field()
  @Column()
  icu!: number;

  @Field()
  @Column()
  icu_ventilator!: number;

  @Field()
  @Column()
  with_oxygen_left!: number;

  @Field()
  @Column()
  without_oxygen_left!: number;

  @Field()
  @Column()
  icu_left!: number;

  @Field()
  @Column()
  icu_ventilator_left!: number;
}
