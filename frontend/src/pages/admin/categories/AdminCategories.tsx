import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Category from "@/types/Category";
import ButtonEnregistrer from "@/components/admin/ButtonEnregistrer";
import Link from "next/link";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetListCategoriesLazyQuery,
  useGetListCategoriesQuery,
  usePatchCategoryMutation,
} from "@/types/graphql";
import router from "next/router";

const schema = yup.object({
  name: yup.string().required("Attention, le nom de la catégorie est requis"), //name doit être de type string et est requis
});

const AdminCategories = () => {
  const [reload, setReload] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [actualId, setActualId] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const lengthName = 15;

  const {
    register,
    handleSubmit, // évite d'enregistrer si y'a rien
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // --- get categories ---
  const [
    getAdList,
    { data: dataList, loading: loadingList, error: errorList },
  ] = useGetListCategoriesLazyQuery({ fetchPolicy: "no-cache" });

  useEffect(() => {
    getAdList({
      onError(err) {
        console.error("error", err);
      },
    });
  }, [reload]);

  // --- gère l'edit ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // gère le nom
    if (e.target.value.length <= lengthName) {
      setNewName(e.target.value);
    }
  };

  function handleEdit(e: React.MouseEvent<HTMLButtonElement>): void {
    // gère le changement editer/annuler
    const id = e.currentTarget.dataset.id;
    if (id) {
      if (actualId && id === actualId) {
        resetForm(); // sort de l'edit
      } else {
        setEditMode(true);
        setActualId(id);

        let category = dataList?.getListCategories.find((c) => c.id == id);
        if (category) {
          setNewName(category?.name); // auto rempli l'input
        }
      }
    }
  }

  // --- submit ---
  const [createCategory, { loading: loadingCreate, error: errorCreate }] =
    useCreateCategoryMutation();

  const [patchCategory, { loading: loadingPatch, error: errorPatch }] =
    usePatchCategoryMutation();

  const onSubmit = (data: { name: string }) => {
    console.log("dataQUIentre", data);
    console.log(editMode);
    if (editMode) {
      patchCategory({
        variables: {
          infos: {
            name: newName,
          },
          id: actualId as string,
        },
        onCompleted(data) {
          console.log("dataQUIsort", data);
          setReload(!reload);
        },
        onError(error) {
          console.error(error);
        },
      });
    } else {
      createCategory({
        variables: { infos: { name: data.name } },
        onCompleted(data) {
          console.log("dataQUIsort", data);
          setReload(!reload);
        },
        onError(error) {
          console.error(error);
        },
      });
    }
    resetForm();
  };

  // --- delete ---
  const [deleteCategory, { loading: loadingDelete, error: errorDelete }] =
    useDeleteCategoryMutation();

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>): void {
    const id = e.currentTarget.dataset.id;
    if (id) {
      deleteCategory({
        variables: { id: id },
        onCompleted() {
          setReload(!reload);
        },
        onError(error) {
          console.error(error);
        },
      });
    }
  }

  // --- reset ---
  const resetForm = () => {
    setEditMode(false);
    setActualId("");
    setNewName("");
  };

  return (
    <div className="adminCategories">
      <Link href={"/categories/list"} className="retourTopButton">
        ← Retour à la liste
      </Link>

      <h1>{editMode ? "MODIFIER UNE CATÉGORIE" : "AJOUTER UNE CATÉGORIE"}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nom :</label>
        <input
          id="name"
          {...register("name")}
          placeholder="votre nom de catégorie"
          value={newName} // pour directement mettre l'ancien nom dans le cas de l'edit
          onChange={(e) => handleChange(e)}
        />
        <p className="length">
          reste : {lengthName - newName.length} / {lengthName}
        </p>

        {/* <ButtonEnregistrer /> */}
        <button
          className="enregistrer"
          type="submit"
          disabled={loadingCreate || loadingPatch} // évite de recliquer quand c'est entrain de faire la requête
        >
          Enregistrer
        </button>
      </form>

      {errorList ? (
        <h2>Une erreur... (déso)</h2>
      ) : loadingList ? (
        <h2>Chargement en cours</h2>
      ) : dataList?.getListCategories.length ? (
        <ul>
          {dataList?.getListCategories.map((category) => (
            <li key={category.id}>
              <Link href={`/categories/${category.id}`}>{category.name}</Link>
              <div className="action">
                <button
                  data-id={category.id}
                  onClick={handleDelete}
                  disabled={editMode || loadingDelete}
                >
                  Supprimer (les annonces aussi)
                </button>
                <button data-id={category.id} onClick={handleEdit}>
                  {category.id === actualId ? "Annuler" : "Editer"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Pas de catégory</h2>
      )}
    </div>
  );
};

export default AdminCategories;
