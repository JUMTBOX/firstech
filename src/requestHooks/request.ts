import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { async } from "q";

export interface Notice {
  article_id: number | null;
  title: string;
  content: string;
  author: string;
  date: string;
}

const getFakeData = async (): Promise<Notice[]> => {
  const { data } = await axios.get("/notices");

  return data;
};

const postFakeData = async (data?: Notice): Promise<number> => {
  const { status } = await axios.post("/notices", {
    data: data,
  });
  return status;
};

const deleteFakeData = async (data: string): Promise<number> => {
  const { status } = await axios.post("/notices/delete", {
    data: data,
  });
  return status;
};

const getHisTory = async (): Promise<string[]> => {
  const { data } = await axios.get("/text/history");
  return data;
};

const postHistory = async (text: string): Promise<number> => {
  const { status } = await axios.post("/text/history", {
    text: text,
  });
  return status;
};

const deleteHistory = async (): Promise<number> => {
  const { status } = await axios.delete("/text/history");
  return status;
};
//////////////////////////////////////////////////////////

const useGetFakeData = (): UseQueryResult<Notice[]> => {
  return useQuery(["fake"], () => getFakeData());
};

const useGetHistory = (): UseQueryResult<string[]> => {
  return useQuery(["history"], () => getHisTory());
};

export {
  useGetFakeData,
  postFakeData,
  deleteFakeData,
  useGetHistory,
  postHistory,
  deleteHistory,
};
