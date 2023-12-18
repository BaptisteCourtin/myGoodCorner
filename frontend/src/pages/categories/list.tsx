import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import axios, { CancelTokenSource } from "axios";
import Category from "@/types/Category";
import Link from "next/link";
import LinkCategories from "@/components/categories/LinkCategories";

const list = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getCategories = (source: CancelTokenSource) => {
    axiosInstance
      .get("categories/list", {
        cancelToken: source.token,
      })
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
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
    const source = axios.CancelToken.source();
    getCategories(source);
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <main className="categories">
      <h1>Liste des categories</h1>
      <Link href={"/admin/categories/AdminCategories"} className="linkAdmin">
        Administrer les catégories →
      </Link>

      {loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <LinkCategories
                id={category.id}
                name={category.name}
              ></LinkCategories>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default list;
