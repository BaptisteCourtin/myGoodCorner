import { GetTagByIdQuery } from "@/types/graphql";
import React from "react";

const TagListRender = ({ name }: { name: String }) => {
  return <p>#{name}</p>;
};

export default TagListRender;
