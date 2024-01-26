import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import DateFormatter from "@/components/DateFormatter";
import SupprimerAd from "@/components/ads/SupprimerAd";
import TagListRender from "@/components/tags/TagListRender";

import { GetTagByIdQuery, useGetAdBySlugLazyQuery } from "@/types/graphql";

const AdSlug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [getAdBySlug, { data, loading, error }] = useGetAdBySlugLazyQuery();

  useEffect(() => {
    if (router.isReady) {
      getAdBySlug({
        variables: { slug: slug as string },
        onError(err) {
          console.error("error", err);
        },
      });
    }
  }, [router.isReady]);

  return (
    <div className="adsId">
      {error ? (
        <h2>Une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : data?.getAdBySlug ? (
        <>
          <Link href={"/ads"} className="retourTopButton">
            ← Retour à la liste
          </Link>

          <SupprimerAd id={data.getAdBySlug?.id} />
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
              <h1>{data.getAdBySlug.title}</h1>
              <img
                src={data.getAdBySlug.picture}
                alt={"image of " + data.getAdBySlug.title}
              />
              <div className="desc desc1">
                <div className="row">
                  <h2>{data.getAdBySlug.title}</h2>
                  <h3>{data.getAdBySlug.price}€</h3>
                </div>
                <p>{data.getAdBySlug.description}</p>
              </div>
              <div className="desc desc2">
                <p>
                  <span>vendeur :</span> {data.getAdBySlug.owner}
                </p>
                <p>
                  <span>venez le chercher à :</span> {data.getAdBySlug.location}
                </p>
                <p>
                  <span>annonce créée le :</span>{" "}
                  <DateFormatter datetime={data.getAdBySlug.createdAt} />
                </p>
              </div>
              <div className="desc desc3">
                {data.getAdBySlug.category && (
                  <Link
                    href={`/categories/${data.getAdBySlug.category.id}`}
                    className="linkCategorie"
                  >
                    {data.getAdBySlug.category.name}
                  </Link>
                )}
                <div className="container-tags">
                  {data.getAdBySlug.tags?.map(
                    (tag: GetTagByIdQuery["getTagById"]) => (
                      <TagListRender
                        name={tag.name}
                        key={tag.id}
                      ></TagListRender>
                    )
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <h2>Pas de ad</h2>
      )}
    </div>
  );
};

export default AdSlug;
