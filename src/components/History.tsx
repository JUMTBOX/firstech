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
    const emptyRegExp = /\s/g;
    if (searchRef.current !== null) {
      let str = searchRef.current.value;
      //검색 input이 빈 값이면 실행 안됨
      if (emptyRegExp.test(str) !== true && str !== "") {
        setIsSearched((cur) => true);
        searchTrigger.mutateAsync(str);
      }
    }
  };

  const onkeySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
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
          <input type="text" ref={searchRef} onKeyDown={onkeySearch} />
          <div></div>
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
          <div className="clearHistory_btn_wrapper">
            <button
              className="clearHistory_btn"
              onClick={
                isSearched ? undefined : () => deleteTrigger.mutateAsync()
              }
            >
              <BsTrash size={"1.2em"} />
            </button>
          </div>
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
                      {el}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}
