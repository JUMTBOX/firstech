import React, { useState, useRef } from "react";
import { postHistory } from "../requestHooks/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../styles/components/InputForm.css";

export default function InputForm() {
  const [result, setResult] = useState<string>("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(postHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["history"]);
    },
  });

  const handleSubmit = (e?: React.FormEvent<HTMLButtonElement>) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    console.log("실행됨");
    if (textRef.current !== null) {
      setResult(`${textRef.current?.value} 변환`);
      mutateAsync(`${textRef.current?.value}변환 `);
    }
  };

  //키보드 눌러도 제출
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
      if (textRef.current !== null) {
        textRef.current.value = "";
      }
    }
  };

  return (
    <div className="inputForm_container">
      <form action="/">
        <textarea ref={textRef} onKeyDown={onKeyDown} />
        <button onClick={handleSubmit}>변환</button>
      </form>
      <div className="inputForm_contentBox">
        <textarea defaultValue={result} />
      </div>
    </div>
  );
}
