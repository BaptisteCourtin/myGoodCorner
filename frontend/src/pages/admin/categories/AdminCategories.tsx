import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios, { CancelTokenSource } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axiosInstance from "@/lib/axiosInstance";
import Category from "@/types/Category";
import ButtonEnregistrer from "@/components/admin/ButtonEnregistrer";
import Link from "next/link";

const schema = yup.object({
  name: yup.string().required("Attention, le nom de la catégorie est requis"), //name doit être de type string et est requis
});

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [actualId, setActualId] = useState<number>();
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

  // --- gère l'edit ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= lengthName) {
      setNewName(e.target.value);
    }
  };

  function handleEdit(e: React.MouseEvent<HTMLButtonElement>): void {
    const id = e.currentTarget.dataset.id;
    if (id) {
      if (actualId && +id === actualId) {
        resetForm(); // sort de l'edit
      } else {
        setEditMode(true);
        setActualId(+id);

        let category = categories.find((c) => c.id == +id);
        if (category) {
          setNewName(category?.name); // auto rempli l'input
        }
      }
    }
  }

  // --- submit ---
  const onSubmit = () => {
    if (editMode) {
      axiosInstance
        .patch(`categories/patch/${actualId}`, { name: newName })
        .then((response) => {
          setCategories(response.data);
        })
        .catch((e) => {
          setError("name", { message: "Une erreur s'est produite : " + e });
        });
    } else {
      axiosInstance
        .post(`categories/create`, { name: newName })
        .then((response) => {
          setCategories(response.data);
        })
        .catch((e) => {
          setError("name", { message: "Une erreur s'est produite : " + e });
        });
    }
    resetForm();
  };

  // --- delete ---
  function handleDelete(e: React.MouseEvent<HTMLButtonElement>): void {
    const id = e.currentTarget.dataset.id;
    if (id) {
      axiosInstance.delete(`categories/delete/${id}`).then((response) => {
        setCategories(response.data);
      });
    }
  }

  // --- reset ---
  const resetForm = () => {
    setEditMode(false);
    setActualId(undefined);
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
          value={newName}
          onChange={(e) => handleChange(e)}
        />
        <p className="length">
          reste : {lengthName - newName.length} / {lengthName}
        </p>
        <p>{errors?.name?.message}</p>
        <ButtonEnregistrer />
      </form>

      {loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/categories/${category.id}`}>{category.name}</Link>
              <div className="action">
                <button
                  data-id={category.id}
                  onClick={handleDelete}
                  disabled={editMode}
                >
                  Supprimer
                </button>
                <button data-id={category.id} onClick={handleEdit}>
                  {category.id === actualId ? "Annuler" : "Editer"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminCategories;
