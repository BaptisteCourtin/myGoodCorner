import DateFormatter from "@/components/DateFormatter";
import SupprimerAd from "@/components/ads/SupprimerAd";
import TagListRender from "@/components/tags/TagListRender";
import axiosInstance from "@/lib/axiosInstance";
import Ad from "@/types/Ad";
import Tag from "@/types/Tag";
import axios, { CancelTokenSource } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";

const AdSlug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useQuery<{ getAdBySlug: Ad }>(GET_AD_DETAIL, {
    variables: { adSlug: slug },
    skip: typeof slug === "undefined",
  });

  const ad2 = data?.getAdBySlug;

  return (
    <div className="adsId">
      {ad2 == undefined ? (
        <h1>Chargement en cours</h1>
      ) : messageError !== undefined ? (
        <h1>{messageError.message}</h1>
      ) : (
        <>
          <Link href={"/ads"} className="retourTopButton">
            ← Retour à la liste
          </Link>

          <SupprimerAd id={ad2?.id} />
          {/* <div className="container-modifier">
            <Link
              href={`/admin/ads/modifierAd/${ad.slug}`}
              className="modifierCeci"
            >
              <p>Modifier l'annonce</p>
            </Link>
          </div> */}

          <main>
            <div className="container-info">
              <h1>{ad2.title}</h1>
              <img src={ad2.picture} alt={"image of " + ad2.title} />
              <div className="desc desc1">
                <div className="row">
                  <h2>{ad2.title}</h2>
                  <h3>{ad2.price}€</h3>
                </div>
                <p>{ad2.description}</p>
              </div>
              <div className="desc desc2">
                <p>
                  <span>vendeur :</span> {ad2.owner}
                </p>
                <p>
                  <span>venez le chercher à :</span> {ad2.location}
                </p>
                <p>
                  <span>annonce créée le :</span>{" "}
                  <DateFormatter datetime={ad2.createdAt} />
                </p>
              </div>
              <div className="desc desc3">
                {ad2.category && (
                  <Link
                    href={`/categories/${ad2.category.id}`}
                    className="linkCategorie"
                  >
                    {ad2.category.name}
                  </Link>
                )}
                <div className="container-tags">
                  {ad2.tags?.map((tag: Tag) => (
                    <TagListRender name={tag.name} key={tag.id}></TagListRender>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default AdSlug;
