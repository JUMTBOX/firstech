import { rest } from "msw";

let fakeData = [
  {
    article_id: 1,
    title: "전사 작업이란?",
    author: "관리자",
    date: "2023-09-06",
  },
  {
    article_id: 2,
    title: "전사 작업 오류 기준",
    author: "관리자",
    date: "2023-09-06",
  },
];

export const handlers = [
  rest.get("/notices", (req, res, ctx) => {
    return res(ctx.json(fakeData));
  }),

  rest.post("/notices", (req, res, ctx) => {
    fakeData.push(req.body.data);
    return res(ctx.status(201));
  }),

  rest.post("/notices/delete", (req, res, ctx) => {
    let deleted = req.body.data;
    fakeData = fakeData.filter((el) => el.article_id !== Number(deleted));
    return res(ctx.status(202));
  }),
];
