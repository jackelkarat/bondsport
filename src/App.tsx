import React from "react";
import { Route, Routes } from "react-router-dom";
import Players from "./components/players";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Players />} />
    </Routes>
  );
}

export default App;
