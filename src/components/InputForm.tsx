import React, { useState, useRef } from "react";
import { postHistory } from "../requestHooks/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../styles/components/InputForm.css";

export default function InputForm() {
  const [result, setResult] = useState<string>();
  const textRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(postHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["history"]);
    },
  });

  const handleSubmit = () => {
    const emptyRegExp = /\s/g;
    if (textRef.current !== null) {
      if (
        //input이 빈값이면 실행 안됨
        emptyRegExp.test(textRef.current.value) !== true &&
        textRef.current.value !== ""
      ) {
        setResult(`${textRef.current?.value} 변환`);
        mutateAsync(`${textRef.current?.value} 변환 `);
        textRef.current.value = "";
      }
    }
  };

  //키보드 눌러도 제출
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="inputForm_container">
      <div className="form">
        <input type="text" ref={textRef} onKeyDown={onKeyDown} />
        <button onClick={handleSubmit}>변환</button>
      </div>
      <div className="inputForm_contentBox">
        <textarea defaultValue={result} />
      </div>
    </div>
  );
}
