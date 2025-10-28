import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "./assets";
import { SEARCH_TEXTS } from "./search.constants";

interface SearchProps {
  onSearchChange: (searchTerm: string) => void;
}

const Search = ({ onSearchChange }: SearchProps) => {
  const [temporalSearchTerm, setTemporalSearchTerm] = useState<string>("");
  const lastSearchTermRef = useRef<string>("");

  const debouncedOnSearchChange = useRef(
    debounce((term: string) => {
      if (term !== lastSearchTermRef.current) {
        onSearchChange(term);
        lastSearchTermRef.current = term;
      }
    }, 1000)
  ).current;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTemporalSearchTerm(event.target.value);
    debouncedOnSearchChange(event.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        debouncedOnSearchChange(temporalSearchTerm);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [temporalSearchTerm, debouncedOnSearchChange]);

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-2.5 text-gray-400" color="lightgray"/>
      <input
        id="search-input"
        type="text"
        placeholder={SEARCH_TEXTS.PLACEHOLDER}
        value={temporalSearchTerm}
        onChange={handleChange}
        autoComplete="on"
        className="bg-fk-light-gray border-1 border-gray-100 p-1.5 pl-10 shadow-md rounded-2xl w-full"
      />
    </div>
  );
};

export default Search;
