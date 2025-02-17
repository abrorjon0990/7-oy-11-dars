import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import MainLayout from "./layout/MainLayout";

function App() {
  return  (
    <div className="max-w-[1800px] mx-auto">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/details/:id"
          element={
            <MainLayout>
              <Details />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
