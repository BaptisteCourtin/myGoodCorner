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
  @Column({ unique: true, length: 15 })
  name: string;

  @Field(() => [AdEntity])
  @OneToMany(() => AdEntity, (ad) => ad.category)
  ads: AdEntity[];
}

@ObjectType()
export class CategoryWithAdsCounted {
  @Field(() => CategoryEntity)
  category: CategoryEntity;

  @Field(() => [AdEntity])
  ads: AdEntity[];

  @Field()
  count: number;
}

@InputType()
export class CategoryCreateEntity {
  @Field()
  name: string;
}

@InputType()
export class CategoryUpdateEntity {
  @Field()
  name: string;
}

export default CategoryEntity;
