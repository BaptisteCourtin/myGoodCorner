import React from "react";
import Link from "next/link";
import LinkCategories from "@/components/categories/LinkCategories";

import { useQuery } from "@apollo/client";
import { GET_LIST_CATEGORIES } from "@/requetes/queries/categories.queries";
import {
  GetListCategoriesQuery,
  GetListCategoriesQueryVariables,
  useGetListCategoriesQuery,
} from "@/types/graphql";

const list = () => {
  // const { data, loading, error } = useQuery<
  //   GetListCategoriesQuery,
  //   GetListCategoriesQueryVariables
  // >(GET_LIST_CATEGORIES);

  // avec ce qui a été généré dans graphql.ts
  const { data, loading, error } = useGetListCategoriesQuery({
    // onCompleted(data) {
    //   console.log("data", data);
    // },
    // onError(err) {
    //   console.log("error", err);
    // },
  });

  return (
    <main className="categories">
      <h1>Liste des categories</h1>
      <Link href={"/admin/categories/AdminCategories"} className="linkAdmin">
        Administrer les catégories →
      </Link>

      {error ? (
        <h2>Une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : data?.getListCategories.length ? (
        <ul>
          {data?.getListCategories.map((category) => (
            <li key={category.id}>
              <LinkCategories
                id={category.id}
                name={category.name}
              ></LinkCategories>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Pas de catégory</h2>
      )}
    </main>
  );
};

export default list;
