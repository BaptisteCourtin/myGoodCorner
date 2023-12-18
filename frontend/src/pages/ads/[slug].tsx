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

const AdSlug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [ad, setAd] = useState<Ad>();

  const getAd = (source: CancelTokenSource) => {
    axiosInstance
      .get(`ads/findBySlug/${slug}`, {
        cancelToken: source.token,
      })
      .then((response) => {
        setAd(response.data);
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
    if (router.isReady) {
      getAd(source);
    }
    return () => {
      source.cancel();
    };
  }, [router.isReady]);

  return (
    <div className="adsId">
      <Link href={"/ads"} className="retourTopButton">
        ← Retour à la liste
      </Link>

      {ad && (
        <>
          <SupprimerAd id={ad?.id} />
          <Link href={`/admin/ads/modifierAd/${ad.slug}`} className="modifier">
            Modifier l'annonce
          </Link>
        </>
      )}

      <main>
        {ad == undefined ? (
          <h1>Chargement en cours</h1>
        ) : (
          <div className="container-info">
            <h1>{ad.title}</h1>
            <img src={ad.picture} alt={"image of " + ad.title} />
            <div className="desc desc1">
              <div className="row">
                <h2>{ad.title}</h2>
                <h3>{ad.price}€</h3>
              </div>
              <p>{ad.description}</p>
            </div>
            <div className="desc desc2">
              <p>
                <span>vendeur :</span> {ad.owner}
              </p>
              <p>
                <span>venez le chercher à :</span> {ad.location}
              </p>
              <p>
                <span>annonce créée le :</span>{" "}
                <DateFormatter datetime={ad.createdAt} />
              </p>
            </div>
            <div className="desc desc3">
              {ad.category && (
                <Link
                  href={`/categories/${ad.category.id}`}
                  className="linkCategorie"
                >
                  {ad.category.name}
                </Link>
              )}
              <div className="container-tags">
                {ad.tags?.map((tag: Tag) => (
                  <TagListRender name={tag.name} key={tag.id}></TagListRender>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdSlug;
