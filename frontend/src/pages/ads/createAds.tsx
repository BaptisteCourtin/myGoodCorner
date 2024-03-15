import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  useCreateAdMutation,
  useGetListCategoriesQuery,
} from "@/types/graphql";

import ButtonEnregistrer from "@/components/admin/ButtonEnregistrer";

const schema = yup.object({
  title: yup.string().required("Attention, le titre de l'annonce est requis"),
  description: yup.string().required("La description est requise"),
  owner: yup
    .string()
    .required("Attention, le propriétaire de l'annonce est requis"),
  price: yup
    .number()
    .positive()
    .required("Attention, le prix de l'annonce est requis"),
  // picture: yup
  //   .string()
  //   .url()
  //   .required("Attention, une image du produit est requise"),
  picture: yup.mixed<FileList>().required("Votre image est requise"),
  location: yup.string().required("Attention, l'adresse est requis"),
  category: yup.object({
    id: yup.number().required("Attention, une catégorie est requise"),
  }),
});

type FormType = {
  title: string;
  description: string;
  owner: string;
  price: number;
  // picture: string;
  picture: FileList;
  location: string;
  category: { id: number };
};

const createAds = ({ ad }: any) => {
  const router = useRouter();
  const [createAd, { loading: loadingAd, error: errorCreate }] =
    useCreateAdMutation();

  const [preview, setPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // --- get categories ---

  const {
    data: dataCategories,
    loading: loadingCategories,
    error: errorCatgeories,
  } = useGetListCategoriesQuery({});

  // --- submit ---

  // const onSubmit = (data: FormType) => {
  //   createAd({
  //     variables: { infos: data },
  //     onCompleted() {
  //       router.push(`/ads`);
  //     },
  //     onError(error) {
  //       console.error(error);
  //     },
  //   });
  // };

  const onSubmit = ({ picture, ...data }: FormType) => {
    if (picture.length) {
      const formData = new FormData();
      formData.append("file", picture[0], picture[0].name);
      axios
        .post("http://localhost:3002/upload", formData)
        .then((result) => {
          console.log(result);
          createAd({
            variables: { infos: { ...data, picture: result.data.filename } },
            onCompleted() {
              router.push(`/ads`);
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // !penser à gérer les erreurs (setError);
  };

  return (
    <div className="adminCreateAds">
      <Link href={"/ads"} className="retourTopButton">
        ← Retour à la liste
      </Link>

      <h1>CREER UNE ANNONCE</h1>

      {loadingCategories ? (
        <div>Chargement en cours </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Titre :</label>
          <input
            id="title"
            type="text"
            {...register("title")}
            placeholder="votre titre d'annonce"
          />
          <p className="error">{errors?.title?.message}</p>

          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="votre description d'annonce"
          />
          <p className="error">{errors?.description?.message}</p>

          <label htmlFor="owner">Propriétaire : </label>
          <input
            id="owner"
            type="text"
            {...register("owner")}
            placeholder="vous"
          />
          <p className="error">{errors?.owner?.message}</p>

          <label htmlFor="price">Prix :</label>
          <input
            id="price"
            type="number"
            {...register("price")}
            placeholder="votre prix"
          />
          <p className="error">{errors?.price?.message}</p>

          {/* <label htmlFor="picture">Image :</label>
        <input
          id="picture"
          type="text"
          {...register("picture")}
          placeholder="votre image"
        />
        <p className="error">{errors?.picture?.message}</p> */}

          <label htmlFor="picture">Image :</label>
          <input
            type="file"
            accept="image/*"
            {...register("picture", {
              onChange(e) {
                console.log("URL", URL.createObjectURL(e.target.files[0]));
                setPreview(URL.createObjectURL(e.target.files[0]));
              },
            })}
            placeholder="Photo"
          />
          <p>{errors?.picture?.message}</p>
          {preview && (
            <div>
              <Image src={preview} alt="preview" width={50} height={50} />
            </div>
          )}

          <label htmlFor="location">Ville :</label>
          <input
            id="location"
            type="text"
            {...register("location")}
            placeholder="votre ville"
          />
          <p className="error">{errors?.location?.message}</p>

          <label htmlFor="category">Categorie :</label>
          <select id="category" {...register("category.id")} defaultValue={""}>
            <option value="" disabled>
              Selectionnez votre categorie
            </option>
            {dataCategories?.getListCategories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input type="submit" disabled={loadingAd} />
          {/* <ButtonEnregistrer /> */}
        </form>
      )}
    </div>
  );
};

export default createAds;
