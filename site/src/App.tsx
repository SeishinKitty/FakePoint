import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import List from "./pages/List"
import ListRelated from "./pages/ListRelated"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="List" element={<List />} />
          <Route path="ListRelated" element={<ListRelated />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
