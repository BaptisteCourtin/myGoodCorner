import React, { SyntheticEvent } from "react";
import Link from "next/link";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useGetListAdLazyQuery } from "@/types/graphql";

const SearchBar = () => {
  const [getListAds, { data, loading }] = useGetListAdLazyQuery();

  const handleSearch = (e: SyntheticEvent<Element, Event>, value: string) => {
    getListAds({ variables: { search: value as string } });
  };

  return (
    <Autocomplete
      className="searchBar"
      loading={loading}
      options={data?.getListAd ?? []}
      groupBy={(option) => option.category.name}
      getOptionLabel={(option) => option.title}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Recherche" />}
      onInputChange={handleSearch}
      renderOption={(props, option, state) => (
        <li {...props} key={option.id}>
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
