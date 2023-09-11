import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export interface Notice {
  article_id: number | null;
  title: string;
  author: string;
  date: string;
}

const getKorPronounce = async (text: string): Promise<string> => {
  const { data } = await axios.post("http://localhost:8080/text", {
    text: text,
  });
  return data;
};

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

//////////////////////////////////////////////////////////

const useGetFakeData = (): UseQueryResult<Notice[]> => {
  return useQuery(["fake"], () => getFakeData());
};

export { getKorPronounce, useGetFakeData, postFakeData, deleteFakeData };
