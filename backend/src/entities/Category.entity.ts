import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Ad from "./Ad.entity";

@Entity("category")
class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}

export default CategoryEntity;
