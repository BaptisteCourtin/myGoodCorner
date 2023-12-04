import CardAd from "@/components/CardAd";
import axiosInstance from "@/lib/axiosInstance";
import Ad from "@/types/Ad";
import Category from "@/types/Category";
import axios, { CancelTokenSource } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CategoryId = () => {
  const router = useRouter();
  const { id } = router.query;

  const [category, setCategory] = useState<Category>();

  const getCategories = (source: CancelTokenSource) => {
    axiosInstance
      .get(`categories/find/${id}`, {
        cancelToken: source.token,
      })
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => {
        if (err.code === "ERR_CANCELED") {
          console.warn("cancel request");
        } else {
          console.error(err);
        }
      });
  };

  useEffect(() => {
    if (router.isReady) {
      const source = axios.CancelToken.source();
      getCategories(source);
      return () => {
        source.cancel();
      };
    }
  }, [router.isReady]);

  return (
    category && (
      <div className="listAdByCategoryId">
        <Link href={"/categories/list"} className="retour">
          ← Retour à la liste
        </Link>
        <main>
          <h1>{category.name}</h1>
          <h2>oui l'id : {id}</h2>

          <ul className="cardsAdUl">
            {category.ads.map((ad: Ad) => (
              <CardAd ad={ad} key={ad.id} />
            ))}
          </ul>
        </main>
      </div>
    )
  );
};

export default CategoryId;
