import { Route, Routes } from "react-router-dom";
import InputForm from "./components/InputForm";
import NoticePage from "./pages/NoticePage";
import WorkPage from "./pages/WorkPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<WorkPage />} />
      <Route path="/notice" element={<NoticePage />} />
    </Routes>
  );
}
