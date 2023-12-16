import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favicon from "react-favicon";
import favicon from './images/favicon.ico'

// Pages
import {Home, Results, Business, User, Review, Layout, NoPage, Credits} from './pages'

function App() {
  return (
      <div className='overflow-hidden'>
        <Favicon url={favicon} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Layout/>}>
              <Route path="results" element={<Results />} />
              <Route path="business" element={<Business />} />
              <Route path="user" element={<User />} />
              <Route path="review" element={<Review />} />
              <Route path="credits" element={<Credits />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>

  );
}

export default App;
