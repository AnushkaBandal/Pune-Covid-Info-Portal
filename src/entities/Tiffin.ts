import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Tiffin extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  provider_name!: string;

  @Field()
  @Column({ unique: true })
  phone_no!: string;

  @Field()
  @Column()
  address!: string;

  @Field()
  @Column()
  price!: string;

  @Field()
  @Column()
  delivery!: string;

  @Field()
  @Column()
  food!: string;
}
