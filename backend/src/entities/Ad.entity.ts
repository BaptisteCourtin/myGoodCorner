import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length, Min } from "class-validator";
import slugify from "slugify";
import { Field, Float, ID, InputType, ObjectType } from "type-graphql";

import CategoryEntity from "./Category.entity";
import TagEntity from "./Tag.entity";

@Entity("ad")
@ObjectType()
class AdEntity {
  @BeforeUpdate()
  @BeforeInsert()
  protected createSlug() {
    this.slug = `${slugify(this.title, { lower: true })}-${Math.floor(
      Math.random() * 1000000
    )}`;
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field()
  @Column({ length: 100 })
  title: string;

  @Field()
  @Column({ type: "text", nullable: true })
  description: string;

  @Field()
  @Column({ length: 100 })
  owner: string;

  @Field(() => Float)
  @Column({ type: "float" })
  price: number;

  @Field()
  @Column({ length: 255 })
  picture: string;

  @Field()
  @Column({ length: 100 })
  location: string;

  @Field(() => String)
  @Column({ default: Date.now() })
  createdAt: number;

  @Field(() => CategoryEntity)
  @ManyToOne(() => CategoryEntity, (c) => c.ads, {
    cascade: true,
    onDelete: "CASCADE",
  }) //j'interdis de créer une annonce sans lui attribuer une catégorie, et je demande à supprimer l'annonce lorsque la catégorie est supprimée!
  category: CategoryEntity;

  @JoinTable()
  @ManyToMany(() => TagEntity, (t) => t.ads, { cascade: ["insert", "update"] })
  tags: TagEntity[];
}

@InputType()
export class PartialCategoryEntity {
  @Field()
  id: number;
}

@InputType()
export class AdCreateEntity {
  @Field()
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field()
  owner: string;
  @Field(() => Float)
  price: number;
  @Field()
  picture: string;
  @Field()
  location: string;
  @Field()
  category: PartialCategoryEntity;
  @Field(() => [String], { nullable: true })
  tags?: string[];
}

// tout en nullable pour update
@InputType()
export class AdUpdateEntity {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  owner: string;
  @Field(() => Float, { nullable: true })
  price: number;
  @Field({ nullable: true })
  location: string;
  @Field({ nullable: true })
  picture: string;
  @Field({ nullable: true })
  category: PartialCategoryEntity;
  @Field(() => [String], { nullable: true })
  tags?: string[];
}

export default AdEntity;
