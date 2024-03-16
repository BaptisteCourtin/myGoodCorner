import axiosInstance from "@/lib/axiosInstance";
import { useDeleteCategoryMutation } from "@/types/graphql";
import router from "next/router";
import React from "react";

const SupprimerCategorie = ({ id }: any) => {
  const [deleteCategory, { loading: loadingDelete, error: errorDelete }] =
    useDeleteCategoryMutation();

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>): void {
    if (id) {
      deleteCategory({
        variables: { deleteCategoryId: id },
        onCompleted() {
          router.push(`/categories/list`);
        },
        onError(error) {
          console.error(error);
        },
      });
    }
  }

  return (
    <div className="adminDeleteCategorie">
      <button onClick={handleDelete}>
        Supprimer cette categorie (cela supprime aussi les annonces)
      </button>
    </div>
  );
};

export default SupprimerCategorie;
