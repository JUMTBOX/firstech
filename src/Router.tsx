import { Route, Routes } from "react-router-dom";
import WorkPage from "./pages/WorkPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<WorkPage />} />
    </Routes>
  );
}
