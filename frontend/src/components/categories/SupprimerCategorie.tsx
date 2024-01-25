import axiosInstance from "@/lib/axiosInstance";
import router from "next/router";
import React from "react";

const SupprimerCategorie = ({ id }: any) => {
  const deleteThisCategorie = () => {};

  return (
    <div className="adminDeleteCategorie">
      <button onClick={deleteThisCategorie}>
        Supprimer cette categorie (cela supprime aussi les annonces)
      </button>
    </div>
  );
};

export default SupprimerCategorie;
