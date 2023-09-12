import { useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";
import {
  deleteHistory,
  useGetHistory,
  searchHistory,
} from "../requestHooks/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../styles/components/History.css";

export default function History() {
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const { data } = useGetHistory();
  const queryClient = useQueryClient();

  const deleteTrigger = useMutation(deleteHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["history"]);
    },
  });

  const searchTrigger = useMutation(searchHistory, {
    onSuccess: (data) => setSearchResult((cur) => data),
  });

  const handleSearch = () => {
    if (searchRef.current !== null) {
      let str = searchRef.current.value;
      setIsSearched((cur) => true);
      searchTrigger.mutateAsync(str);
    }
  };

  const handleSearchResultClear = () => {
    if (searchRef.current !== null) {
      searchRef.current.value = "";
    }
    setIsSearched((cur) => false);
  };
  return (
    <>
      <div className="history_container" ref={historyRef}>
        <div className="searchInput_wrapper">
          <input type="text" ref={searchRef} />
          {isSearched ? (
            <button
              className="clearSearchResult_btn"
              onClick={handleSearchResultClear}
            >
              <HiXMark size={"1em"} />
            </button>
          ) : null}
          <button className="searchTrigger_btn" onClick={handleSearch}>
            검색
          </button>
        </div>
        <div className="history_wrapper">
          <button
            className="clearHistory_btn"
            onClick={isSearched ? undefined : () => deleteTrigger.mutateAsync()}
          >
            <BsTrash size={"1.2em"} />
          </button>
          <div className="history_content">
            {isSearched
              ? searchResult.map((el, idx) => {
                  return (
                    <div key={idx} className="log_item">
                      <p>{el}</p>
                    </div>
                  );
                })
              : data?.map((el, idx) => {
                  return (
                    <div key={idx} className="log_item">
                      <p>{el}</p>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}
