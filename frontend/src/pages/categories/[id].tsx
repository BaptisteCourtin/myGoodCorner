import CardAd from "@/components/ads/CardAd";
import SupprimerCategorie from "@/components/categories/SupprimerCategorie";
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
  const [messageError, setMessageError] = useState<Error>();

  const getCategories = (source: CancelTokenSource) => {
    axiosInstance
      .get(`categories/find/${id}`, {
        cancelToken: source.token,
      })
      .then((response) => {
        setCategory(response.data);
        if (response.data.name == undefined) {
          setMessageError(response.data);
        }
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
    <div className="listAdByCategoryId">
      {category == undefined ? (
        <h1>Chargement en cours</h1>
      ) : messageError !== undefined ? (
        <h1>{messageError.message}</h1>
      ) : (
        <>
          <Link href={"/categories/list"} className="retourTopButton">
            ← Retour à la liste
          </Link>

          <SupprimerCategorie id={category?.id} />

          <main>
            <h1>{category.name}</h1>

            <ul className="cardsAdUl">
              {category.ads.map((ad: Ad) => (
                <CardAd ad={ad} key={ad.id} />
              ))}
            </ul>
          </main>
        </>
      )}
    </div>
  );
};

export default CategoryId;
