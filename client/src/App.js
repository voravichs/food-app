import "./css/App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import Restaurant from './pages/Restaurant';
import Review from "./pages/Review";
import User from "./pages/User";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8080/");
      const data = await res.json();
      const { message } = data;
      setData(message);
    })();
  }, []);

  return (
    <div className="App">
      <div>
        <h1>
          You should see "Welcome to "Underground Foodies" below if you are
          successfully connected to the backend
        </h1>
        <h2>{data}</h2>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/review" element={<Review />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
