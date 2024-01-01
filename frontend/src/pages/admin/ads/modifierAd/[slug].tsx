import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios, { CancelTokenSource } from "axios";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axiosInstance from "@/lib/axiosInstance";
import Category from "@/types/Category";
import ButtonEnregistrer from "@/components/admin/ButtonEnregistrer";
import Ad from "@/types/Ad";
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

const modifierAd = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [ad, setAd] = useState<Partial<Ad>>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [messageError, setMessageError] = useState<Error>();

  // --- get ad ---
  const getAd = (source: CancelTokenSource) => {
    axiosInstance
      .get(`ads/findBySlug/${slug}`, {
        cancelToken: source.token,
      })
      .then((response) => {
        setAd(response.data);
        if (response.data.title == undefined) {
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
    const source = axios.CancelToken.source();
    if (router.isReady) {
      getAd(source);
    }
    return () => {
      source.cancel();
    };
  }, [router.isReady]);

  // ---

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // --- get categories ---

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

  const onSubmit = () => {
    axiosInstance
      .patch(`ads/patch/${ad?.id}`, ad)
      .then(() => {
        router.push("/ads");
        console.log("C'est bon pour nous");
      })
      .catch(() => {
        console.error("C'est pas bon pour nous : ");
      });
  };

  const handleChange = (e: any) => {
    const { name } = e.target;
    setAd((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  return (
    <div className="adminModifierAd">
      {ad == undefined ? (
        <h1>Chargement en cours</h1>
      ) : messageError !== undefined ? (
        <h1>{messageError.message}</h1>
      ) : (
        <>
          <Link href={"/ads"} className="retourTopButton">
            ← Retour à la liste
          </Link>

          <h1>MODIFIER UNE ANNONCE</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Titre :</label>
            <input
              id="title"
              type="text"
              {...register("title")}
              placeholder="votre titre d'annonce"
              value={ad.title}
              onChange={(e) => handleChange(e)}
            />
            <p>{errors?.title?.message}</p>

            <label htmlFor="description">Description :</label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="votre description d'annonce"
              value={ad.description}
            />
            <p>{errors?.description?.message}</p>

            <label htmlFor="owner">Propriétaire : </label>
            <input
              id="owner"
              type="text"
              {...register("owner")}
              placeholder="vous"
              value={ad.owner}
            />
            <p>{errors?.owner?.message}</p>

            <label htmlFor="price">Prix :</label>
            <input
              id="price"
              type="number"
              {...register("price")}
              placeholder="votre prix"
              value={ad.price}
            />
            <p>{errors?.price?.message}</p>

            <label htmlFor="picture">Image :</label>
            <input
              id="picture"
              type="text"
              {...register("picture")}
              placeholder="votre image"
              value={ad.picture}
            />
            <p>{errors?.picture?.message}</p>

            <label htmlFor="location">Ville :</label>
            <input
              id="location"
              type="text"
              {...register("location")}
              placeholder="votre ville"
              value={ad.location}
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
            <p>{errors?.category?.message}</p>

            <ButtonEnregistrer />
          </form>
        </>
      )}
    </div>
  );
};

export default modifierAd;
