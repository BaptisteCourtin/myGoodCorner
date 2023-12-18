import axiosInstance from "@/lib/axiosInstance";
import router from "next/router";
import React from "react";

const SupprimerAd = ({ id }: any) => {
  const deleteThisAd = () => {
    axiosInstance
      .delete(`/ads/delete/${id}`)
      .then(() => {
        router.push("/ads");
        console.log("C'est bon pour nous");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="adminDeleteAd">
      <button onClick={deleteThisAd}>Supprimer cette annonce</button>
    </div>
  );
};

export default SupprimerAd;
