import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import VerifyPage from "./pages/VerifyPage";
import Brand from "./pages/Brand";
import Mobile from "./pages/Mobile";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ViewProductPage from "./pages/ViewProductPage";
import SignOutPage from "./pages/SignOutPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/verify" element={<VerifyPage/>}/>
          <Route path="/" element={<DashboardPage/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
