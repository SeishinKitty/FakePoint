import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import List from "./pages/List"
import ListRelated from "./pages/ListRelated"
import ListRelatedView from './pages/ListRelatedView';
import ListView from './pages/ListView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="List" element={<List />} />
          <Route path="ListRelated" element={<ListRelated />} />
          <Route path="ListRelated/:id" element={<ListRelatedView />} />
          <Route path="List/:id" element={<ListView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
