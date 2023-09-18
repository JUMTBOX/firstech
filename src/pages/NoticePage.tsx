import React from "react";
import { useGetFakeData, Notice } from "../requestHooks/request";
import { UseQueryResult } from "@tanstack/react-query";
import Table from "../components/Table";
import "../styles/components/Notice.css";

const NoticePage = () => {
  const { data }: UseQueryResult<Notice[]> = useGetFakeData();

  return (
    <div className="notice_container">
      <div className="notice_wrapper">
        {data ? <Table data={data} /> : null}
      </div>
    </div>
  );
};

export default NoticePage;
