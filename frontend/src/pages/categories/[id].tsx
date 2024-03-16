import CardAd from "@/components/ads/CardAd";
import SupprimerCategorie from "@/components/categories/SupprimerCategorie";
import Pagination from "@/components/ads/Pagination";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  GetCategoryByIdQuery,
  useGetCategoryByIdLazyQuery,
} from "@/types/graphql";

const CategoryId = () => {
  const router = useRouter();
  const { id } = router.query;

  const [getCategoryById, { data, loading, error }] =
    useGetCategoryByIdLazyQuery();

  useEffect(() => {
    if (router.isReady) {
      getCategoryById({
        variables: { getCategoryByIdId: id as string },
        onError(err) {
          console.log("error", err);
        },
      });
    }
  }, [router.isReady]);

  //   const callRequest = (p: number, limit: number) => {
  //     console.log(p, limit);
  //     findCategory({
  //       variables: {
  //         findCategoryId: router.query.id as string,
  //         limit,
  //         skip: (p - 1) * limit,
  //       },
  //     });
  //   };

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

          <SupprimerCategorie id={data?.getCategoryById.category.id} />

          <main>
            <h1>{data?.getCategoryById.category.name}</h1>

            <ul className="cardsAdUl">
              {data?.getCategoryById.ads.map(
                (ad: GetCategoryByIdQuery["getCategoryById"]["ads"][0]) => (
                  <CardAd ad={ad} key={ad.id} /> // il manque category dans ad mais osef (ça marche pas quand j'essaie de la prendre)
                )
              )}
            </ul>

            {/* <AdsGrid ads={data?.findCategory.ads} />
            <Pagination
              count={data?.findCategory.count}
              callRequest={callRequest}
            /> */}
          </main>
        </>
      )}
    </div>
  );
};

export default CategoryId;
