// import CardAd from "@/components/ads/CardAd";
// import SupprimerCategorie from "@/components/categories/SupprimerCategorie";

// import Ad from "@/types/Ad";
// import Category from "@/types/Category";

// import axiosInstance from "@/lib/axiosInstance";
// import axios, { CancelTokenSource } from "axios";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// import { useQuery } from "@apollo/client";
// import { GET_CATEGORY_BY_ID } from "@/requetes/queries/categories.queries";
// import {
//   AdEntity,
//   GetAdByIdQuery,
//   GetCategoryByIdQuery,
//   useGetCategoryByIdLazyQuery,
//   useGetCategoryByIdQuery,
// } from "@/types/graphql";

// const CategoryId = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   // ------------------------- EXPRESS

//   // const [category, setCategory] = useState<Category>();
//   // const [messageError, setMessageError] = useState<Error>();

//   // const getCategories = (source: CancelTokenSource) => {
//   //   axiosInstance
//   //     .get(`categories/find/${id}`, {
//   //       cancelToken: source.token,
//   //     })
//   //     .then((response) => {
//   //       setCategory(response.data);
//   //       if (response.data.name == undefined) {
//   //         setMessageError(response.data);
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       if (err.code === "ERR_CANCELED") {
//   //         console.warn("cancel request");
//   //       } else {
//   //         console.error(err);
//   //       }
//   //     });
//   // };

//   // useEffect(() => {
//   //   if (router.isReady) {
//   //     const source = axios.CancelToken.source();
//   //     getCategories(source);
//   //     return () => {
//   //       source.cancel();
//   //     };
//   //   }
//   // }, [router.isReady]);

//   // ------------------------- GRAPHQL

//   const [getCategoryById, { data, loading, error }] =
//     useGetCategoryByIdLazyQuery();

//   useEffect(() => {
//     if (router.isReady) {
//       getCategoryById({
//         variables: { id: id as string },
//         onError(err) {
//           console.log("error", err);
//         },
//       });
//     }
//   }, [router.isReady]);

//   return (
//     <div className="listAdByCategoryId">
//       {error ? (
//         <h2>Une erreur... (déso)</h2>
//       ) : loading ? (
//         <h2>Chargement en cours</h2>
//       ) : (
//         <>
//           <Link href={"/categories/list"} className="retourTopButton">
//             ← Retour à la liste
//           </Link>

//           <SupprimerCategorie id={data?.getCategoryById.id} />

//           <main>
//             <h1>{data?.getCategoryById.name}</h1>

//             <ul className="cardsAdUl">
//               {data?.getCategoryById.ads.map(
//                 (ad: GetCategoryByIdQuery["getCategoryById"]["ads"][0]) => (
//                   <CardAd ad={ad} key={ad.id} /> // osef
//                 )
//               )}
//             </ul>
//           </main>
//         </>
//       )}
//     </div>
//   );
// };

// export default CategoryId;

import AdsGrid from "@/components/ads/AdsGrid";
import Pagination from "@/components/ads/Pagination";
import Back from "@/components/common/Back";
import { useFindCategoryLazyQuery } from "@/types/graphql";
import { useFindCategoryLazyQuery } from "@/types/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

function CategoryId() {
  const router = useRouter();
  const [findCategory, { data, loading }] = useFindCategoryLazyQuery({
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (router.isReady) {
      findCategory({
        variables: { findCategoryId: router.query.id as string },
      });
    }
  }, [router.isReady]);

  const callRequest = (p: number, limit: number) => {
    console.log(p, limit);
    findCategory({
      variables: {
        findCategoryId: router.query.id as string,
        limit,
        skip: (p - 1) * limit,
      },
    });
  };

  if (loading) {
    return <div>Chargement en cours</div>;
  }
  return (
    <div>
      <Back />
      <h1>{data?.findCategory.category.name}</h1>
      {data?.findCategory.ads.length ? (
        <>
          <AdsGrid ads={data?.findCategory.ads} />
          <Pagination
            count={data?.findCategory.count}
            callRequest={callRequest}
          />
        </>
      ) : (
        <div>Aucune annonce dans cette catégorie</div>
      )}
    </div>
  );
}
export default CategoryId;
