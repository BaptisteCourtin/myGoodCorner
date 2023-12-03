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
import Category from "./Category.entity";
import Tag from "./Tag.entity";
import slugify from "slugify";

@Entity("ad")
class AdEntity {
  @BeforeUpdate()
  @BeforeInsert()
  protected createSlug() {
    this.slug = `${slugify(this.title, { lower: true })}-${Math.floor(
      Math.random() * 1000000
    )}`;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.ads, {
    nullable: true,
    onDelete: "CASCADE",
  }) // je demande à supprimer l'annonce lorsque la catégorie est supprimée!
  category: Category;

  @ManyToMany(() => Tag, { cascade: ["insert", "update"] })
  @JoinTable()
  tags: Tag[];

  @Column()
  title: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  owner: string;
  @Column()
  price: number;
  @Column({ nullable: true })
  picture: string;
  @Column()
  location: string;
  @Column({ default: Date.now() })
  createdAt: string;
  @Column({ nullable: true, unique: true })
  slug: string;
}

export default AdEntity;
