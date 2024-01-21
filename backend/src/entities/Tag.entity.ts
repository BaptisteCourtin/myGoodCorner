import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import AdEntity from "./Ad.entity";
import { ObjectType, Field, ID, InputType } from "type-graphql";

@Entity("tag")
@ObjectType()
class TagEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 100 })
  name: string;

  @Field(() => [AdEntity])
  @ManyToMany(() => AdEntity, (ad) => ad.tags)
  ads: AdEntity[];
}

@InputType()
export class TagCreateEntity {
  @Field()
  name: string;
}

@InputType()
export class TagUpdateEntity {
  @Field()
  name: string;
}

export default TagEntity;
