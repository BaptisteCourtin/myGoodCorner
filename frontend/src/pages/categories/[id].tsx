import CardAd from "@/components/ads/CardAd";
import SupprimerCategorie from "@/components/categories/SupprimerCategorie";
import axiosInstance from "@/lib/axiosInstance";
import Ad from "@/types/Ad";
import Category from "@/types/Category";
import axios, { CancelTokenSource } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";

const GET_CATEGORY = gql`
  query getCategoryById {
    category {
      id
      name
      ads {
        id
        slug

        title
        description
        price
        picture

        owner
        location
        createdAt
      }
    }
  }
`;

const CategoryId = () => {
  const router = useRouter();
  const { id } = router.query;

  const [category, setCategory] = useState<Category>();
  const [messageError, setMessageError] = useState<Error>();

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

  // -------------------------

  // const { data, error } = useQuery<{ getCategoryById: Category }>(
  //   GET_CATEGORY,
  //   {
  //     variables: { categoryId: id },
  //     skip: typeof id === "undefined",
  //   }
  // );

  // const category2 = data?.getCategoryById;

  // --------------------------

  const { loading, data, error, refetch } = useListCategoriesQuery({
    onCompleted(data) {
      console.log("DATA", data);
    },
    onError(error) {
      console.log("ERROR", error);
    },
  });

  useEffect(() => {
    console.log("DATA", data);
  }, [data]);

  return (
    <div className="listAdByCategoryId">
      {data == undefined ? (
        <h1>Chargement en cours</h1>
      ) : messageError !== undefined ? (
        <h1>{messageError.message}</h1>
      ) : (
        <>
          <Link href={"/categories/list"} className="retourTopButton">
            ← Retour à la liste
          </Link>

          <SupprimerCategorie id={data?.id} />

          <main>
            <h1>{data.name}</h1>

            <ul className="cardsAdUl">
              {data.ads.map((ad: Ad) => (
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
function useListCategoriesQuery(arg0: {
  // const { loading, data, error } = useQuery<ListCategoriesQuery>(LIST_CATEGORIES, {
  onCompleted(data: any): void;
  onError(error: any): void;
}): { loading: any; data: any; error: any; refetch: any } {
  throw new Error("Function not implemented.");
}
