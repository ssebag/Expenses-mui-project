import {Routes, Route } from "react-router-dom";
import './App.css'
import Home from './Pages/Home';
import Create from './Pages/Create';
import MainLayout from "./Component/MainLayout/MainLayout";

function App() {
  
  return (
    <div>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </MainLayout>
    </div>
  )
}

export default App
