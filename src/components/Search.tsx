import React from "react";

interface IProps {
    searchPlayerTerm:Function;
}

function Search({ searchPlayerTerm }: IProps) {
  return (
      <input
        type="text"
        className="searchTerm"
        placeholder="Search player"
        onChange={event => searchPlayerTerm(event.target.value)}
    />
  );
}

export default Search;
