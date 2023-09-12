import { Route, Routes } from "react-router-dom";
import NoticePage from "./pages/NoticePage";
import WorkPage from "./pages/WorkPage";
import LoginPage from "./pages/LoginPage";
import WriteNoticePage from "./pages/WriteNoticePage";
import NoticeContent from "./pages/NoticeContent";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<WorkPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/notice/write" element={<WriteNoticePage />} />
      <Route path="/notice/:id" element={<NoticeContent />} />
    </Routes>
  );
}
