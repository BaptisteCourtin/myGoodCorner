import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";

import AdEntity from "./Ad.entity";

@Entity("category")
@ObjectType()
class CategoryEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [AdEntity])
  @OneToMany(() => AdEntity, (ad) => ad.category)
  ads: AdEntity[];
}

@InputType()
export class CategoryCreateEntity {
  @Field()
  name: string;
}

@InputType()
export class CategoryUpdateEntity {
  @Field({ nullable: true })
  name: string;
}

export default CategoryEntity;
