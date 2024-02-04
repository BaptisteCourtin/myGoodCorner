import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ButtonEnregistrer from "@/components/admin/ButtonEnregistrer";
import {
  useGetAdBySlugLazyQuery,
  useGetListCategoriesQuery,
  usePatchAdMutation,
} from "@/types/graphql";

const schema = yup.object({
  title: yup.string().required("Attention, le titre de l'annonce est requis"),
  description: yup.string(),
  owner: yup
    .string()
    .required("Attention, le propriétaire de l'annonce est requis"),
  price: yup
    .number()
    .positive()
    .required("Attention, le prix de l'annonce est requis"),
  picture: yup
    .string()
    .url()
    .required("Attention, une image du produit est requise"),
  location: yup.string().required("Attention, l'adresse est requis"),
  category: yup.object({
    id: yup.number().required("Attention, une catégorie est requise"),
  }),
});

type FormType = {
  title: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  category: { id: number };
};

const modifierAd = () => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // --- get ad ---
  const [getAdBySlug, { data: dataAd, loading: loadingAd, error: errorAd }] =
    useGetAdBySlugLazyQuery();

  useEffect(() => {
    if (router.isReady) {
      getAdBySlug({
        variables: { slug: slug as string },
        onError(err) {
          console.error("error", err);
        },
      });
    }
  }, [router.isReady]);

  // --- get categories ---

  const {
    data: dataCategories,
    loading: loadingCategories,
    error: errorCatgeories,
  } = useGetListCategoriesQuery({});

  // --- submit ---

  const [patchAd, { loading: loadingPatch, error: errorPatch }] =
    usePatchAdMutation();

  const onSubmit = (data: FormType) => {
    patchAd({
      variables: { id: dataAd?.getAdBySlug.id as string, infos: data },
      onCompleted() {
        router.push(`/ads`);
      },
      onError(error) {
        console.error(error);
      },
    });
  };

  return (
    <div className="adminModifierAd">
      {errorAd ? (
        <h2>Une erreur... (déso)</h2>
      ) : loadingAd ? (
        <h2>Chargement en cours</h2>
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
              value={dataAd?.getAdBySlug.title}
            />
            <p className="error">{errors?.title?.message}</p>

            <label htmlFor="description">Description :</label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="votre description d'annonce"
              value={dataAd?.getAdBySlug.description}
            />
            <p className="error">{errors?.description?.message}</p>

            <label htmlFor="owner">Propriétaire : </label>
            <input
              id="owner"
              type="text"
              {...register("owner")}
              placeholder="vous"
              value={dataAd?.getAdBySlug.owner}
            />
            <p className="error">{errors?.owner?.message}</p>

            <label htmlFor="price">Prix :</label>
            <input
              id="price"
              type="number"
              {...register("price")}
              placeholder="votre prix"
              value={dataAd?.getAdBySlug.price}
            />
            <p className="error">{errors?.price?.message}</p>

            <label htmlFor="picture">Image :</label>
            <input
              id="picture"
              type="text"
              {...register("picture")}
              placeholder="votre image"
              value={dataAd?.getAdBySlug.picture}
            />
            <p className="error">{errors?.picture?.message}</p>

            <label htmlFor="location">Ville :</label>
            <input
              id="location"
              type="text"
              {...register("location")}
              placeholder="votre ville"
              value={dataAd?.getAdBySlug.location}
            />
            <p className="error">{errors?.location?.message}</p>

            <label htmlFor="category">Categorie :</label>
            <select id="category" {...register("category")} defaultValue={""}>
              <option value="" disabled>
                Selectionnez votre categorie
              </option>
              {dataCategories?.getListCategories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <p className="error">{errors?.category?.message}</p>

            <ButtonEnregistrer />
          </form>
        </>
      )}
    </div>
  );
};

export default modifierAd;
