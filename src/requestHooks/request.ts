import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export interface Notice {
  article_id: number | null;
  title: string;
  file?: string;
  content: string;
  author: string;
  date: string;
}

//공지글 전체 조회
const getFakeData = async (): Promise<Notice[]> => {
  const { data } = await axios.get("/notices");

  return data;
};
// 개별 공지글 내용 조회
const getOneFakeData = async (id: string): Promise<Notice> => {
  const { data } = await axios.get(`/notices/${id}`);
  return data;
};
// 공지글 작성
const postFakeData = async (data?: Notice): Promise<number> => {
  const { status } = await axios.post("/notices", {
    data: data,
  });
  return status;
};

export interface Mod {
  title: string;
  content: string;
}
//공지글 수정
const modifyFakeData = async (data: Mod, id: any): Promise<number> => {
  const { status } = await axios.post(`/notices/${id}/mod`, {
    title: data.title,
    content: data.content,
  });
  return status;
};
//공지글 선택 삭제
const deleteFakeData = async (data: string): Promise<number> => {
  const { status } = await axios.post("/notices/delete", {
    data: data,
  });
  return status;
};

//전체 히스토리 조회
const getHisTory = async (): Promise<string[]> => {
  const { data } = await axios.get("/text/history");
  return data;
};
//히스토리 추가
const postHistory = async (text: string): Promise<number> => {
  const { status } = await axios.post("/text/history", {
    text: text,
  });
  return status;
};
//히스토리 전체 삭제
const deleteHistory = async (): Promise<number> => {
  const { status } = await axios.delete("/text/history");
  return status;
};
//히스토리 검색
const searchHistory = async (str: string): Promise<string[]> => {
  const res = await axios.post("/text/history/search", {
    str: str,
  });
  let result = res.data;
  return result;
};

export interface User {
  user_id: string;
  passwd: string;
  flag?: string;
}

//유저 로그인
const userLogin = async (data: User): Promise<number> => {
  const { status } = await axios.post("/user", {
    user_id: data.user_id,
    passwd: data.passwd,
  });
  return status;
};

const getUser = async (): Promise<User> => {
  const { data } = await axios.get("http://172.30.1.84:8080/user");

  console.log(data);
  return data;
};

//////////////////////////////////////////////////////////

const useGetFakeData = (): UseQueryResult<Notice[]> => {
  return useQuery(["fake"], () => getFakeData(), {
    staleTime: 300000,
  });
};

const useGetOneFakeData = (id: any): UseQueryResult<Notice> => {
  return useQuery(["fakeOne"], () => getOneFakeData(id), {
    staleTime: 300000,
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
  modifyFakeData,
  userLogin,
  getUser,
};
