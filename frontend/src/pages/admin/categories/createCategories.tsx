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
  name: yup.string().required("Attention, le nom de la catégorie est requis"), //name doit être de type string et est requis
});

const createCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  // ---

  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [actualId, setActualId] = useState<number>();

  const resetForm = () => {
    setEditMode(false);
    setActualId(undefined);
    setNewCategoryName("");
  };

  // const onSubmit = (data: any) => {
  //   axiosInstance
  //     .post("/categories/create", data)
  //     .then(() => {
  //       // router.push("/categories/list");
  //     })
  //     .catch((e) => {
  //       setError("name", { message: "Une erreur s'est produite : " + e });
  //     });
  // };

  /**
   * ajoute une category OU patch le name de la category
   * @param e
   */
  const onSubmit = (data: any) => {
    console.log(data);
    if (editMode) {
      axiosInstance
        .patch(`categories/patch/${actualId}`, { name: newCategoryName })
        .then((response) => {
          console.log(response.data);
          setCategories(response.data);
        });
      resetForm();
    } else {
      axiosInstance
        .post(`categories/create`, data)
        .then((response) => {
          setCategories(response.data);
        })
        .catch((e) => {
          setError("name", { message: "Une erreur s'est produite : " + e });
        });
      setNewCategoryName("");
    }
  };

  return (
    <div className="adminCategories">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="votre nom de catégorie" />
        <p>{errors?.name?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default createCategories;
