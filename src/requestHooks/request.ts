import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export interface Notice {
  article_id: number | null;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface User {
  user_id: string;
  passwd: string;
  flag: string;
}

const getFakeData = async (): Promise<Notice[]> => {
  const { data } = await axios.get("/notices");

  return data;
};

const getOneFakeData = async (id: string): Promise<Notice> => {
  const { data } = await axios.get(`/notices/${id}`);
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

const searchHistory = async (str: string): Promise<string[]> => {
  const res = await axios.post("/text/history/search", {
    str: str,
  });
  let result = res.data;
  console.log(result);

  return result;
};

const postUser = async (): Promise<User> => {
  const { data } = await axios.post("http://localhost:8080/user");

  console.log(data);
  return data;
};

//////////////////////////////////////////////////////////

const useGetFakeData = (): UseQueryResult<Notice[]> => {
  return useQuery(["fake"], () => getFakeData());
};

const useGetOneFakeData = (id: any): UseQueryResult<Notice> => {
  return useQuery(["fakeOne"], () => getOneFakeData(id), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 3,
  });
};

const useGetHistory = (): UseQueryResult<string[]> => {
  return useQuery(["history"], () => getHisTory());
};

export {
  useGetFakeData,
  useGetOneFakeData,
  getOneFakeData,
  postFakeData,
  deleteFakeData,
  useGetHistory,
  postHistory,
  deleteHistory,
  searchHistory,
  postUser,
};
