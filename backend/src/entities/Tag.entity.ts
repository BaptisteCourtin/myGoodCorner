import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Ad from "./Ad.entity";

@Entity("tag")
class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // @ManyToMany(() => Ad, (ad) => ad.tags, { cascade: true, nullable: true, })
  // @JoinTable().
  // ads: Ad[];
}

export default TagEntity;
