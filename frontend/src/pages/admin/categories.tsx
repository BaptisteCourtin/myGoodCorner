import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import axios, { CancelTokenSource } from "axios";
import Category from "@/types/Category";
import Link from "next/link";

const admin = () => {
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

  // ---

  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [actualId, setActualId] = useState<number>();

  const resetForm = () => {
    setEditMode(false);
    setActualId(undefined);
    setNewCategoryName("");
  };

  /**
   * actualise le name de l'input
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };

  /**
   * ajoute une category OU patch le name de la category
   * @param e
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        .post(`categories/create`, { name: newCategoryName })
        .then((response) => {
          setCategories(response.data);
        });
      setNewCategoryName("");
    }
  };

  /**
   * met en place le patch
   * @param e
   */
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
          setNewCategoryName(category?.name); // auto rempli l'input
        }
      }
    }
  }

  /**
   * delete la category
   * @param e
   */
  function handleDelete(e: React.MouseEvent<HTMLButtonElement>): void {
    const id = e.currentTarget.dataset.id;
    if (id) {
      axiosInstance.delete(`categories/delete/${id}`).then((response) => {
        setCategories(response.data);
      });
    }
  }

  return (
    <main className="adminCategories">
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

      <form onSubmit={handleSubmit}>
        <input
          placeholder="votre nom de catégorie"
          onChange={handleChange}
          value={newCategoryName}
        />
        <button>{editMode ? "Editer" : "Créer"}</button>
      </form>
    </main>
  );
};

export default admin;
