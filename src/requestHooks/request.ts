import axios from "axios";
import { hardCoding } from "./hardcode";

const getKorPronounce = async (text: string): Promise<string> => {
  const enRegex: RegExp = /[a-z,A-z]/g;
  const splited: string[] = text.split(" ");
  let unique: any = "";
  let result: string = "";

  for (let word of splited) {
    if (enRegex.test(word)) {
      unique = word.match(enRegex)?.toString().replaceAll(",", "");
    }
  }

  try {
    const { data } = await axios.get(
      `http://aha-dic.com/View.asp?word=${unique}`
    );
    const startIdx = data.match("한글발음").index;
    const endIdx = data.match("</title>").index;

    if (data) {
      const krWord = data.slice(startIdx, endIdx);
      const left = krWord.match(/[[]/).index + 1;
      const right = krWord.match(",").index - 1;
      const realData = krWord.slice(left, right);
      result = text.replace(unique, `(${unique})/(${realData})`);
    }
  } catch (err) {
    if (err) {
      let hardResult = hardCoding(unique);
      result = text.replace(unique, `(${unique})/(${hardResult})`);
    }
  }
  return result;
};

export { getKorPronounce };
