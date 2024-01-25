import axiosInstance from "@/lib/axiosInstance";
import router from "next/router";
import React from "react";

const SupprimerAd = ({ id }: any) => {
  const deleteThisAd = () => {};

  return (
    <div className="adminDeleteAd">
      <button onClick={deleteThisAd}>Supprimer cette annonce</button>
    </div>
  );
};

export default SupprimerAd;
