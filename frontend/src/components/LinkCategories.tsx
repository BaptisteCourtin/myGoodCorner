import Link from "next/link";
import router from "next/router";
import React from "react";

const LinkCategories = ({ id, name }: any) => {
  const LinkCategory = () => {
    router.push(`/categories/${id}`);
  };

  return (
    <Link href={`/categories/${id}`} className="linkCategorie">
      {name}
    </Link>

    // <button className="linkCategorie" onClick={LinkCategory}>
    //   {name}
    // </button>
  );
};

export default LinkCategories;
