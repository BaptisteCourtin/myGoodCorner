import React from "react";
import Link from "next/link";
import Tag from "@/types/Tag";

import LinkCategories from "../categories/LinkCategories";
import TagListRender from "../tags/TagListRender";
import DateFormatter from "../DateFormatter";

const CardAd = ({ ad }: any) => {
  return (
    <Link href={`/ads/${ad.slug}`}>
      <li className="cardAd">
        <img src={ad.picture} alt={"image of " + ad.title} />
        <div className="desc desc1">
          <div className="row">
            <h2>{ad.title}</h2>
            <h3>{ad.price}€</h3>
          </div>
          <p>{ad.description}</p>
        </div>
        <hr />
        <div className="desc desc2">
          <p>vendeur : {ad.owner}</p>
          <p>venez le chercher à : {ad.location}</p>
          <p>
            annonce créée le : <DateFormatter datetime={ad.createdAt} />
          </p>
        </div>
        <hr />
        <div className="desc desc3">
          {ad.category && (
            <LinkCategories
              id={ad.category.id}
              name={ad.category.name}
            ></LinkCategories>
          )}
          <div className="container-tags">
            {ad.tags?.map((tag: Tag) => (
              <TagListRender name={tag.name} key={tag.id}></TagListRender>
            ))}
          </div>
        </div>
      </li>
    </Link>
  );
};

export default CardAd;
