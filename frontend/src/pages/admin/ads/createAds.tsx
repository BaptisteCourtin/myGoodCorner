import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import Category from "@/types/Category";

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

const createAds = () => {
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
    console.log(data);

    axiosInstance
      .post("/ads/create", data)
      .then(() => {
        // router.push("/ads");
        console.log("C'est bon pour nous");
      })
      .catch((e) => {
        setError(data, { message: "C'est pas bon pour nous : " + e });
      });
  };

  return (
    <div className="adminAds">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("title")}
          placeholder="votre titre d'annonce"
        />
        <p>{errors?.title?.message}</p>

        <textarea
          {...register("description")}
          placeholder="votre description d'annonce"
        />
        <p>{errors?.description?.message}</p>

        <input type="text" {...register("owner")} placeholder="vous" />
        <p>{errors?.owner?.message}</p>

        <input type="number" {...register("price")} placeholder="votre prix" />
        <p>{errors?.price?.message}</p>

        <input type="text" {...register("picture")} placeholder="votre image" />
        <p>{errors?.picture?.message}</p>

        <input
          type="text"
          {...register("location")}
          placeholder="votre ville"
        />
        <p>{errors?.location?.message}</p>

        <select id="tri" {...register("category")} defaultValue={""}>
          <option value="" disabled>
            Selectionnez votre categorie
          </option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input className="envoyer" type="submit" />
      </form>
    </div>
  );
};

export default createAds;
