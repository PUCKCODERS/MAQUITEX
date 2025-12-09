import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductListing from "./Pages/ProductListing";
import ProductDetails from "./Pages/ProductDetails";
import { createContext, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

import Button from "@mui/material/Button";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CartPage from "./Pages/Cart";
import Verify from "./Pages/Verify";
import toast, { Toaster } from "react-hot-toast";
import ForgotPassword from "./Pages/ForgotPassword";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import MyList from "./Pages/MyList";
import Orders from "./Pages/Orders";
import { fetchDataFromApi, postData } from "./utils/api";
import Address from "./Pages/MyAccount/address";

const MyContext = createContext();

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {},
  });

  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);

  const [openCartPanel, setOpenCartPanel] = useState(false);

  const handleOpenProductDetailsModal = (status, item) => {
    setOpenProductDetailsModal({
      open: status,
      item: item,
    });
  };

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal({
      open: false,
      item: {},
    });
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        setUserData(res.data);
        if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message === "NO HAS INICIADO SESIÓN") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            alertBox(
              "error",
              "SU SESIÓN HA EXPIRADO, POR FAVOR INICIE SESIÓN DE NUEVO"
            );

            window.location.href = "/login";
            setIsLogin(false);
          }
        }
      });

      getCartItems();
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if (res?.error === false) {
        setCatData(res?.data);
      }
    });
  }, []);

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg, {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#274a72",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "bold",
        },
      });
    }
    if (status === "error") {
      toast.error(msg, {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#274a72",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "bold",
        },
      });
    }
  };

  const alertBox = (type, msg) => {
    if (type === "success") {
      toast.success(msg, {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#274a72",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "bold",
        },
      });
    }
    if (type === "error") {
      toast.error(msg, {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#274a72",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "bold",
        },
      });
    }
  };

  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      alertBox("error", "NO HAS INICIADO SESIÓN, POR FAVOR INICIA SESIÓN");
      return false;
    }

    const data = {
      productTitle: product?.name,
      image: product?.image,
      rating: product?.rating,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?._id,
      countInStock: product?.countInStock,
      brand: product?.brand,
      size: product?.size,
      weight: product?.weight,
      ram: product?.ram,
    };

    console.log(data);

    postData("/api/cart/add", data).then((res) => {
      if (res?.error === false) {
        alertBox("success", res?.message);

        getCartItems();
      } else {
        alertBox("error", res?.message);
      }
    });
  };

  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data);
      }
    });
  };

  const values = {
    openProductDetailsModal,
    setOpenProductDetailsModal,
    handleOpenProductDetailsModal,
    handleCloseProductDetailsModal,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    alertBox,
    setUserData,
    userData,
    setAddress,
    address,
    setCatData,
    catData,
    addToCart,
    cartData,
    setCartData,
    getCartItems,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route
              path={"/productListing"}
              exact={true}
              element={<ProductListing />}
            />
            <Route
              path={"/product/:id"}
              exact={true}
              element={<ProductDetails />}
            />
            <Route path={"/login"} exact={true} element={<Login />} />
            <Route path={"/register"} exact={true} element={<Register />} />
            <Route path={"/cart"} exact={true} element={<CartPage />} />
            <Route path={"/verify"} exact={true} element={<Verify />} />
            <Route
              path={"/forgot-password"}
              exact={true}
              element={<ForgotPassword />}
            />
            <Route path={"/checkout"} exact={true} element={<Checkout />} />
            <Route path={"/my-account"} exact={true} element={<MyAccount />} />
            <Route path={"/my-list"} exact={true} element={<MyList />} />
            <Route path={"/my-orders"} exact={true} element={<Orders />} />
            <Route path={"/address"} exact={true} element={<Address />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />

      <Toaster />
    </>
  );
}

export default App;
export { MyContext };
