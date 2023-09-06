import React, { useRef } from "react";
import { getKorPronounce } from "../requestHooks/request";
import "../styles/components/InputForm.css";

export default function InputForm({ setResult }: { setResult: Function }) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e?: React.FormEvent<HTMLButtonElement>) => {
    if (e !== undefined) {
      e.preventDefault();
    }

    if (textRef.current !== null) {
      getKorPronounce(textRef.current?.value).then((res) => setResult(res));
    }
  };

  //키보드 눌러도 제출
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
      btnRef.current?.focus();
    }
  };

  return (
    <div className="inputForm_wrapper">
      <form action="/">
        <textarea ref={textRef} onKeyDown={onKeyDown} />
        <button onClick={handleSubmit} ref={btnRef}>
          텍스트 치환하기
        </button>
      </form>
    </div>
  );
}
