import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home'
import Results from './pages/Results'
import Business from './pages/Business';
import User from "./pages/User";
import Review from "./pages/Review"

function App() {
  return (
      <div className='overflow-hidden'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/business" element={<Business />} />
            <Route path="/user" element={<User />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </BrowserRouter>
      </div>

  );
}

export default App;
