import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { loadingState } from "./states/atoms/auth";

import { RecoilRoot, useRecoilValue } from 'recoil';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Home from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ComposeEmail from "@/pages/ComposeEamil";
import Callback from "@/pages/Callback"; 
import ProtectedRoute from "@/auth/ProtectedRoute"; 

import LogoutPopup from "./pages/LogoutPop";
import DeleteAccountPopup from './pages/DeleteAccountPopup'
import LoaderComponent from "./components/LoaderComponent";


function App() {
  const isLoading = useRecoilValue(loadingState);
  return (
      <Router>
      <Header />
      <LogoutPopup />
      <DeleteAccountPopup />
      <Sidebar />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/email/bulk"
            element={
              <ProtectedRoute>
                <ComposeEmail />
              </ProtectedRoute>
            }
          />
           <Route
            path="/email/one"
            element={
              <ProtectedRoute>
                <ComposeEmail />
              </ProtectedRoute>
            }
          />
          <Route path="/email/callback" element={<Callback />} /> 
        </Routes>
        {isLoading &&  <LoaderComponent />} 
      </Router>
   
  );
}

export default App;