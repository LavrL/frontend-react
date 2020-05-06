import React, { useState } from "react";

const Search = ({ search }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }

    const resetInputField = () => {
        setSearchValue("");
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        search(searchValue);
        resetInputField();
    }
    return (
        <div className="search">
            <input
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
                placeholder="Enter a movie: (ex. Batman)"
            />
            <input onClick={callSearchFunction}
                type="submit"
                value="SEARCH" />
        </div>
    )
}
export default Search;
