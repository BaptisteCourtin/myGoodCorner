import CardAd from "@/components/ads/CardAd";
import SupprimerCategorie from "@/components/categories/SupprimerCategorie";
import axiosInstance from "@/lib/axiosInstance";
import Ad from "@/types/Ad";
import Category from "@/types/Category";
import axios, { CancelTokenSource } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/client";
import { GET_CATEGORY_BY_ID } from "@/requetes/queries/categories.queries";
import {
  AdEntity,
  GetAdByIdQuery,
  useGetCategoryByIdLazyQuery,
  useGetCategoryByIdQuery,
} from "@/types/graphql";

const CategoryId = () => {
  const router = useRouter();
  const { id } = router.query;

  // ------------------------- EXPRESS

  // const [category, setCategory] = useState<Category>();
  // const [messageError, setMessageError] = useState<Error>();

  // const getCategories = (source: CancelTokenSource) => {
  //   axiosInstance
  //     .get(`categories/find/${id}`, {
  //       cancelToken: source.token,
  //     })
  //     .then((response) => {
  //       setCategory(response.data);
  //       if (response.data.name == undefined) {
  //         setMessageError(response.data);
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.code === "ERR_CANCELED") {
  //         console.warn("cancel request");
  //       } else {
  //         console.error(err);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   if (router.isReady) {
  //     const source = axios.CancelToken.source();
  //     getCategories(source);
  //     return () => {
  //       source.cancel();
  //     };
  //   }
  // }, [router.isReady]);

  // ------------------------- GRAPHQL

  // const { data, loading, error } = useGetCategoryByIdQuery({
  //   variables: {
  //     id: id as string,
  //   },
  //   onCompleted(data) {
  //     console.log("data", data);
  //   },
  //   onError(err) {
  //     console.log("error", err);
  //   },
  // });

  const [getCategoryById, { data, loading, error }] =
    useGetCategoryByIdLazyQuery();

  useEffect(() => {
    if (router.isReady) {
      getCategoryById({
        variables: { id: id as string },
        onCompleted(data) {
          console.log("data", data);
        },
        onError(err) {
          console.log("error", err);
        },
      });
    }
  }, [router.isReady]);

  return (
    <div className="listAdByCategoryId">
      {error ? (
        <h2>Une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        <>
          <Link href={"/categories/list"} className="retourTopButton">
            ← Retour à la liste
          </Link>

          <SupprimerCategorie id={data?.getCategoryById.id} />

          <main>
            <h1>{data?.getCategoryById.name}</h1>

            <ul className="cardsAdUl">
              {data?.getCategoryById.ads.map(
                (ad: GetAdByIdQuery["getAdById"]) => (
                  <CardAd ad={ad} key={ad.id} />
                )
              )}
            </ul>
          </main>
        </>
      )}
    </div>
  );
};

export default CategoryId;
