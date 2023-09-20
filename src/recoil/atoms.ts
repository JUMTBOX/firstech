import { atom } from "recoil";

export const loginState = atom({
  key: "login",
  default: true,
});

export const modalState = atom({
  key: "isOpen",
  default: false,
});
