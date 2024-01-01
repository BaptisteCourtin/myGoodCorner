import CardAd from "@/components/ads/CardAd";
import SearchBar from "@/components/ads/SearchBar";
import axiosInstance from "@/lib/axiosInstance";
import Ad from "@/types/Ad";
import axios, { CancelTokenSource } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const index = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [tri, setTri] = useState<string>("Date Décroissante");

  const getAds = (source: CancelTokenSource) => {
    axiosInstance
      .get<Ad[]>("ads/list", {
        cancelToken: source.token,
      })
      .then((response) => {
        setAds(response.data);
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
    getAds(source);
    return () => {
      source.cancel();
    };
  }, []);

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

      {loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        <ul className="cardsAdUl">
          {ads
            .sort(function compare(a, b) {
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
            .map((ad) => (
              <CardAd ad={ad} key={ad.id} />
            ))}
        </ul>
      )}
    </main>
  );
};

export default index;
