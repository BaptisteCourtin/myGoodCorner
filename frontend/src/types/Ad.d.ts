import Category from "./Category";
import Tag from "./Tag";

interface Ad {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: string;
  slug: string;

  category: Category;
  tags: Tag[];
}

export default Ad;
