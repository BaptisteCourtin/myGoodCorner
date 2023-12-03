import React, { SyntheticEvent, useState } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Ad from "@/types/Ad";
import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";
import router from "next/router";

const SearchBar = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  const handleSearch = (e: SyntheticEvent<Element, Event>, value: string) => {
    axiosInstance
      .get<Ad[]>(`ads/list?search=${value}`)
      .then((response) => {
        setAds(response.data);
      })
      .catch((err) => {
        if (err.code === "ERR_CANCELED") {
          console.warn("cancel request");
        } else {
          console.error(err);
        }
      });
  };

  return (
    <Autocomplete
      className="searchBar"
      options={ads}
      groupBy={(option) => option.category.name}
      getOptionLabel={(option) => option.slug}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Recherche" />}
      onInputChange={handleSearch}
      renderOption={(props, option, state) => (
        <li {...props}>
          <Link href={`/ads/${option.slug}`}>
            <p style={{ paddingLeft: "2rem" }} key={state.index}>
              {option.title}
            </p>
          </Link>
        </li>
      )}
    />
  );
};

export default SearchBar;
