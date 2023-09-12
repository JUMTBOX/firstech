import { rest } from "msw";

let fakeData = [
  {
    article_id: 1,
    title: "전사 작업이란?",
    author: "관리자",
    content:
      "전사 작업이란 실제 발성한 내용을 정확히 글자로 옮기는 것을 말합니다.",
    date: "2023-09-06",
  },
  {
    article_id: 2,
    title: "전사 작업 오류 기준",
    author: "관리자",
    content: "관련 내용 자료로 첨부하니 참조 바랍니다.",
    date: "2023-09-06",
  },
];

let history = [];

export const handlers = [
  ///////////////Notice mockUp api
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

  ///////////////History mockUp api
  rest.get("/text/history", (req, res, ctx) => {
    return res(ctx.json(history));
  }),

  rest.post("/text/history", (req, res, ctx) => {
    let data = req.body.text;
    history.push(data.replaceAll("\n", ""));
    return res(ctx.status(201));
  }),

  rest.post("/text/history/search", (req, res, ctx) => {
    let str = req.body.str;
    let data = history.filter((el) => el.includes(str));
    return res(ctx.json(data));
  }),

  rest.delete("/text/history", (req, res, ctx) => {
    history = [];
    return res(ctx.status(202));
  }),
];
