import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import VerifyPage from "./pages/VerifyPage";
import Mobile from "./pages/Mobile";
import HomePage from "./pages/HomPage";
import Brand from "./pages/Brand";
import ProductPage from "./pages/ProductPage";
import ViewProductPage from "./pages/ViewProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import VerifyForgotPasswordPage from "./pages/forgotPasswordVerifyPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/verify" element={<VerifyPage/>}/>
          <Route path="/dash" element={<DashboardPage/>}/>

          <Route path="/" element={<HomePage/>}/>
          <Route path="/products" element={<ProductPage/>}/>
          <Route path="/products/:mobileId" element={<ViewProductPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/mobile" element={<Mobile/>}/>
          <Route path="/brand" element={<Brand/>}/>


          <Route path="/forgotpassword" element={<ForgotPasswordPage/>}/>
          <Route path="/passwordreset" element={<PasswordResetPage/>}/>
          <Route path="/verifyforgotpassword" element={<VerifyForgotPasswordPage/>}/>

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
