import {Routes, Route } from "react-router-dom";
import './App.css'
import Home from './Pages/Home';
import Create from './Pages/Create';
import MainLayout from "./Component/MainLayout/MainLayout";
import AuthProvider from "./context/AuthContext";
import RequireAuth from "./context/RequireAuth";
import Login from "./Component/Auth/Login";
import Signup from "./Component/Auth/Signup";

function App() {
  
  return (
    <div>
    
          <AuthProvider>
            <Routes>
            <Route
                path="/"
                element={
                  <RequireAuth>
                    <MainLayout>
                       <Home />
                    </MainLayout>
                  </RequireAuth>
                }
              />
               <Route
                path="/create"
                element={
                  <RequireAuth>
                    <MainLayout>
                      <Create />
                    </MainLayout>
                  </RequireAuth>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
          </Routes>
          </AuthProvider>
    </div>
  )
}

export default App
