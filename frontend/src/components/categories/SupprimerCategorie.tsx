import axiosInstance from "@/lib/axiosInstance";
import router from "next/router";
import React from "react";

const SupprimerCategorie = ({ id }: any) => {
  const deleteThisCategorie = () => {
    axiosInstance
      .delete(`/categories/delete/${id}`)
      .then(() => {
        router.push("/categories/list");
        console.log("C'est bon pour nous");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="adminDeleteCategorie">
      <button onClick={deleteThisCategorie}>
        Supprimer cette categorie (cela supprime aussi les annonces)
      </button>
    </div>
  );
};

export default SupprimerCategorie;
