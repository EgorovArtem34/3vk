import { Routes, Route } from "react-router-dom";
import { GroupsPage, NotFoundPage } from "@/pages/index";
import "@/styles/index.scss";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
