import React, { useState } from "react";
import Link from "next/link";

import CardAd from "@/components/ads/CardAd";
import SearchBar from "@/components/ads/SearchBar";

import { GetAdByIdQuery, useGetListAdQuery } from "@/types/graphql";

const index = () => {
  const [tri, setTri] = useState<string>("Date Décroissante");

  // avec ce qui a été généré dans graphql.ts
  const { data, loading, error } = useGetListAdQuery({});

  return (
    <main className="adsList">
      <h1>ADS LIST</h1>

      <Link href={"/admin/ads/createAds"} className="linkAdmin">
        Créer une annonce →
      </Link>

      <SearchBar />

      <div className="trieur">
        <label htmlFor="tri">Ordre de tri : </label>
        <select id="tri" onChange={(event) => setTri(event.target.value)}>
          <option value="Date Décroissante">Date Décroissante</option>
          <option value="Date Croissante">Date Croissante</option>
          <option value="Titre A-Z">Titre A-Z</option>
          <option value="Titre Z-A">Titre Z-A</option>
          <option value="Prix Décroissant">Prix Décroissant</option>
          <option value="Date Croissant">Prix Croissant</option>
        </select>
      </div>

      {error ? (
        <h2>Une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : data?.getListAd.length ? (
        <ul className="cardsAdUl">
          {data?.getListAd
            .slice()
            .sort(function compare(a: any, b: any) {
              if (tri === "Date Décroissante") {
                if (a.id < b.id) return 1;
                else if (a.id > b.id) return -1;
                return 0;
              } else if (tri === "Date Croissante") {
                if (a.id < b.id) return -1;
                else if (a.id > b.id) return 1;
                return 0;
              } else if (tri === "Titre A-Z") {
                if (a.title < b.title) return -1;
                else if (a.title > b.title) return 1;
                return 0;
              } else if (tri === "Titre Z-A") {
                if (a.title < b.title) return 1;
                else if (a.title > b.title) return -1;
                return 0;
              } else if (tri === "Prix Décroissant") {
                if (a.price < b.price) return 1;
                else if (a.price > b.price) return -1;
                return 0;
              } else if (tri === "Date Croissant") {
                if (a.price < b.price) return -1;
                else if (a.price > b.price) return 1;
                return 0;
              }
              return 0;
            })
            .map((ad: GetAdByIdQuery["getAdById"]) => (
              <CardAd ad={ad} key={ad.id} />
            ))}
        </ul>
      ) : (
        <h2>Pas de ads</h2>
      )}
    </main>
  );
};

export default index;
