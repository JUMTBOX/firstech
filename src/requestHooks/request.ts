import axios from "axios";
import {
  useQuery,
  useQueryClient,
  useMutation,
  UseQueryResult,
} from "@tanstack/react-query";

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
  const { data } = await axios.get("http://localhost:8080/notice");

  return data;
};

const useGetFakeData = (): UseQueryResult<Notice[]> => {
  return useQuery(["fake"], () => getFakeData());
};

export { getKorPronounce, useGetFakeData };
