import axiosInstance from "@/lib/axiosInstance";
import { useDeleteAdMutation } from "@/types/graphql";
import router from "next/router";
import React from "react";

const SupprimerAd = ({ id }: any) => {
  const deleteThisAd = () => {};

  // const [deleteAdMutation, { data, loading, error }] = useDeleteAdMutation({
  //   variables: {
  //     id: id,
  //   },
  // });

  return (
    <div className="adminDeleteAd">
      <button onClick={deleteThisAd}>Supprimer cette annonce</button>
    </div>
  );
};

export default SupprimerAd;
