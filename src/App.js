import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Main from "./containers/Main";
import NotFound from "./components/404/NotFound";
import MessagesPage from "./components/MessagesPage/MessagesPage";
import { StyleProvider } from "./contexts/StyleContext";

function App() {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useState(darkPref.matches);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <StyleProvider value={{ isDark, changeTheme }}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </StyleProvider>
  );
}

export default App;