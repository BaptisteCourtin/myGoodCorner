import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios, { CancelTokenSource } from "axios";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axiosInstance from "@/lib/axiosInstance";
import Category from "@/types/Category";
import ButtonEnregistrer from "@/components/admin/ButtonEnregistrer";
import Link from "next/link";

const schema = yup.object({
  title: yup.string().required("Attention, le titre de l'annonce est requis"),
  description: yup.string(),
  owner: yup
    .string()
    .required("Attention, le propriétaire de l'annonce est requis"),
  price: yup.string().required("Attention, le prix de l'annonce est requis"),
  picture: yup.string(),
  location: yup
    .string()
    .required("Attention, l'adresse de l'annonce est requis"),
  category: yup.number(),
});

const createAds = ({ ad }: any) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ---

  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = (source: CancelTokenSource) => {
    axiosInstance
      .get("categories/list", {
        cancelToken: source.token,
      })
      .then((response) => {
        setCategories(response.data);
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

  // ---

  const onSubmit = (data: any) => {
    axiosInstance
      .post(`/ads/create`, data)
      .then(() => {
        router.push("/ads");
        console.log("C'est bon pour nous");
      })
      .catch((e) => {
        setError(data, { message: "C'est pas bon pour nous : " + e });
      });
  };

  return (
    <div className="adminCreateAds">
      <Link href={"/ads"} className="retourTopButton">
        ← Retour à la liste
      </Link>

      <h1>CREER UNE ANNONCE</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Titre :</label>
        <input
          id="title"
          type="text"
          {...register("title")}
          placeholder="votre titre d'annonce"
        />
        <p>{errors?.title?.message}</p>

        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          {...register("description")}
          placeholder="votre description d'annonce"
        />
        <p>{errors?.description?.message}</p>

        <label htmlFor="owner">Propriétaire : </label>
        <input
          id="owner"
          type="text"
          {...register("owner")}
          placeholder="vous"
        />
        <p>{errors?.owner?.message}</p>

        <label htmlFor="price">Prix :</label>
        <input
          id="price"
          type="number"
          {...register("price")}
          placeholder="votre prix"
        />
        <p>{errors?.price?.message}</p>

        <label htmlFor="picture">Image :</label>
        <input
          id="picture"
          type="text"
          {...register("picture")}
          placeholder="votre image"
        />
        <p>{errors?.picture?.message}</p>

        <label htmlFor="location">Ville :</label>
        <input
          id="location"
          type="text"
          {...register("location")}
          placeholder="votre ville"
        />
        <p>{errors?.location?.message}</p>

        <label htmlFor="category">Categorie :</label>
        <select id="category" {...register("category")} defaultValue={""}>
          <option value="" disabled>
            Selectionnez votre categorie
          </option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <ButtonEnregistrer />
      </form>
    </div>
  );
};

export default createAds;
