import axios from "axios";

const getKorPronounce = async (text: string): Promise<string> => {
  const { data } = await axios.post("http://localhost:8080/text", {
    text: text,
  });
  return data;
};

export { getKorPronounce };
