import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Intro from "./components/Intro";
import Upload from "./components/Upload";
import Main from "./components/Main";
import LessonPlan from "./components/LessonPlan";
import MCQ from "./components/MCQ";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/main" element={<Main />} />
        <Route path="/lesson" element={<LessonPlan />} />
        <Route path="/quiz" element={<MCQ />} />
      </Routes>
    </Router>
  );
}

export default App;
