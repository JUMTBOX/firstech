import { useEffect, useState, useRef } from "react";
import { BsTrash } from "react-icons/bs";
import "../styles/components/History.css";

export default function History({
  log,
  isClicked,
}: {
  log: string;
  isClicked: boolean;
}) {
  const [history, setHistory] = useState<string[]>([]);
  const historyRef = useRef<HTMLDivElement>(null);

  const handleClearHistory = () => {
    setHistory((cur) => []);
  };

  useEffect(() => {
    if (isClicked) {
      if (historyRef.current !== null) {
        historyRef.current.style.opacity = "1";
      }
    } else {
      if (historyRef.current !== null) {
        historyRef.current.style.opacity = "0";
      }
    }
  }, [isClicked]);

  useEffect(() => {
    if (log !== "") {
      setHistory((cur) => [...cur, log]);
    }
  }, [log]);

  return (
    <>
      {/* {isClicked ? (
        <div className="history_container" ref={historyRef}>
          {history.map((el, idx) => {
            return (
              <div key={idx} className="log_item">
                <p>{el}</p>
              </div>
            );
          })}
        </div>
      ) : null} */}
      <div className="history_container" ref={historyRef}>
        <div className="clearHistory_btn_wrapper">
          <button className="clearHistory_btn" onClick={handleClearHistory}>
            <BsTrash size={"1.2em"} />
          </button>
        </div>
        <div className="history_wrapper">
          {history.map((el, idx) => {
            return (
              <div key={idx} className="log_item">
                <p>{el}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
