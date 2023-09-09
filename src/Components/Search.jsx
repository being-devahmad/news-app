import React from "react";
import { useGlobalContext } from "./Context";

const Search = () => {
  const { querry, searchPost } = useGlobalContext();
  return (
    <>
      <div>
        <h1>Ahmad News Website</h1>
        <form action="" onSubmit={(e)=> e.preventDefault}>
          <div>
            <input
              type="text"
              placeholder="Search here"
              value={querry}
              onChange={(e) => searchPost(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
