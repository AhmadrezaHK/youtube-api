import React, { useState } from "react";

export default function SearchBar(props) {
  const [keyword, setKeyword] = useState("");

  const searchSubmit = e => {
    e.preventDefault();
    props.onSubmit(keyword)
  };

  return (
    <form
      className="d-flex flex-column"
      autoComplete="off"
      onSubmit={searchSubmit}
    >
      <div className="form-group align-self-stretch">
        <input
          type="text"
          className="form-control form-control-lg text-center"
          id="searchBar"
          placeholder="Search ..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          autoComplete="false"
        />
      </div>
      <button type="submit" className="btn btn-primary btn-lg btn-block">
        Search
      </button>
    </form>
  );
}
