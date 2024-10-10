import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import IntroPage from './components/IntroPage';
import UploadPdfPage from './components/UploadPdfPage';
import QuizPage from './components/QuizPage';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/upload_pdf" element={<UploadPdfPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
