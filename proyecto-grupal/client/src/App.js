import "./App.css";
import { Route } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminRoute from "./helpers/AdminRoute";
import CreateProduct from "./components/CreateProduct/CreateProduct.jsx";
import ModifyProduct from "./components/ModifyProduct/ModifyProduct.jsx";
import CreateCategory from "./components/CreateCategory/CreateCategory.jsx";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Register from "./components/Register/Register";
import PostLogIn from "./components/Auth0/PostLogIn";
import LoginModal from "./components/Login/LoginModal";
import s from "./App.module.css";
import UsersAdministration from "./components/UsersAdministration/UsersAdministration";
import Cart from "./components/Cart/Cart.jsx";
import PasswordReset from "../src/components/PasswordReset/PasswordReset";
import PasswordConfirm from "../src/components/PasswordReset/PasswordConfirm";
import CheckoutSuccess from "../src/components/Checkout/CheckoutSuccess";
import CheckoutFailure from "./components/Checkout/CheckoutFailure";
import OrderAdministration from "./components/OrdersAdministration/OrderAdministration";
import Profile from "./components/Profile/Profile";
import OrderDetail from "./components/OrdersAdministration/OrderDetail";
import WishList from "./components/WishList/WishList";
import OrderList from "./components/Reviews/OrderList";

function App() {
  return (
    <div className={s.App}>
      <Route exact path={"/"} component={Home} />
      <Route exact path={"/home"} component={Home} />
      <Route exact path="/details/:id" component={ProductDetails} />
      <AdminRoute path="/modifyProduct/:id" component={ModifyProduct} />
      <AdminRoute path="/createProduct" component={CreateProduct} />
      <AdminRoute path="/createCategory" component={CreateCategory} />
      <Route exact path="/register" component={Register} />
      <Route path="/passReset" component={PasswordReset} />
      <Route path="/passConfirm/:id/:token" component={PasswordConfirm} />
      <Route exact path="/postlogin" component={PostLogIn} />
      <Route path="/cart" component={Cart} />
      <Route exact path="/login" component={LoginModal} />
      <Route exact path="/checkout/success" component={CheckoutSuccess} />
      <Route exact path="/checkout/failure" component={CheckoutFailure} />
      <AdminRoute path="/administrateUsers" component={UsersAdministration} />
      <AdminRoute path="/administrateOrders" component={OrderAdministration} />
      <Route exact path={"/profile"} component={Profile} />
      <Route exact path="/orderDetails/:id/:id" component={OrderDetail} />
      <Route path="/wishList" component={WishList} />
      <Route exact path={"/orders/user"} component={OrderList} />
    </div>
  );
}

export default App;
