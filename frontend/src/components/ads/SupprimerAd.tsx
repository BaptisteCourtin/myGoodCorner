import { useDeleteAdMutation } from "@/types/graphql";
import router from "next/router";
import React from "react";

const SupprimerAd = ({ id }: any) => {
  const [deleteAdMutation, { data, loading, error }] = useDeleteAdMutation({
    variables: {
      id: id,
    },
  });

  const deleteThisAd = () => {
    deleteAdMutation({
      variables: { id: id },
      onCompleted() {
        router.push("/ads");
      },
      onError(err) {
        console.error("error", err);
      },
    });
  };

  return (
    <div className="adminDeleteAd">
      {error ? (
        <h2>Une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        <button onClick={deleteThisAd}>Supprimer cette annonce</button>
      )}
    </div>
  );
};

export default SupprimerAd;
