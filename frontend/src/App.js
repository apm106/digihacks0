import React, { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  const [showResults, setShowResults] = useState(false);

  const handleShowResults = () => {
    setShowResults(true);
  };

  return showResults ? (
    <ResultsPage />
  ) : (
    <LandingPage onShowResults={handleShowResults} />
  );
}

export default App;
