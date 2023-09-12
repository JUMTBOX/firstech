import { useEffect, useState, useRef } from "react";
import { BsTrash } from "react-icons/bs";
import { deleteHistory, useGetHistory } from "../requestHooks/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../styles/components/History.css";

export default function History() {
  const historyRef = useRef<HTMLDivElement>(null);
  const { data } = useGetHistory();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(deleteHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["history"]);
    },
  });

  return (
    <>
      <div className="history_container" ref={historyRef}>
        <div className="searchInput_wrapper">
          <input type="text" />
          <button>검색</button>
        </div>
        <div className="history_wrapper">
          <button className="clearHistory_btn" onClick={() => mutateAsync()}>
            <BsTrash size={"1.2em"} />
          </button>
          <div className="history_content">
            {data?.map((el, idx) => {
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
