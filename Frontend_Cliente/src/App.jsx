import "./App.css";
import "./responsive.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState, lazy, Suspense } from "react";
import { IoCloseSharp } from "react-icons/io5";

import Button from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi, postData } from "./utils/api";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./Pages/Home"));
const ProductListing = lazy(() => import("./Pages/ProductListing"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const CartPage = lazy(() => import("./Pages/Cart"));
const Verify = lazy(() => import("./Pages/Verify"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const MyAccount = lazy(() => import("./Pages/MyAccount"));
const MyList = lazy(() => import("./Pages/MyList"));
const Orders = lazy(() => import("./Pages/Orders"));
const Address = lazy(() => import("./Pages/MyAccount/address"));
const OrderSuccess = lazy(() => import("./Pages/Orders/success"));
const OrderFailed = lazy(() => import("./Pages/Orders/failed"));
const SearchPage = lazy(() => import("./Pages/Search"));
const ServicioTecnico = lazy(() => import("./Pages/S.Tecnico"));
const Nosotros = lazy(() => import("./Pages/Nosotros"));
const Contacto = lazy(() => import("./Pages/Contacto"));
const Factura = lazy(() => import("./Pages/Orders/factura"));
const FirstBlog = lazy(() => import("./components/BlogItem/Blogs/FirstBlog"));
const SecondBlog = lazy(() => import("./components/BlogItem/Blogs/SecondBlog"));

const MyContext = createContext();

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {},
  });

  const [isLogin, setIsLogin] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  });

  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [myListData, setMyListData] = useState([]);

  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [openAddressPanel, setOpenAddressPanel] = useState(false);

  const [addressMode, setAddressMode] = useState("add");
  const [addressId, setAddressId] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openFilter, setOpenFilter] = useState(false);
  const [isFilterBtnShow, setIsFilterBtnShow] = useState(false);
  const [openSearchPanel, setOpenSearchPanel] = useState(false);

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

  const toggleAddressPanel = (newOpen) => () => {
    if (newOpen == false) {
      setAddressMode("add");
    }
    setOpenAddressPanel(newOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      getCartItems();
      getMyListData();
      getUserDetails();
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const getUserDetails = () => {
    fetchDataFromApi(`/api/user/user-details`).then((res) => {
      setUserData(res.data);
      if (res?.response?.data?.error === true) {
        if (res?.response?.data?.message === "NO HAS INICIADO SESIÓN") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          alertBox(
            "error",
            "SU SESIÓN HA EXPIRADO, POR FAVOR INICIE SESIÓN DE NUEVO",
          );

          window.location.href = "/login";
          setIsLogin(false);
        }
      }
    });
  };

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if (res?.error === false) {
        setCatData(res?.data);
      }
    });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const getMyListData = () => {
    fetchDataFromApi(`/api/myList`).then((res) => {
      if (res?.error === false) {
        setMyListData(res?.data);
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
    setOpenAddressPanel,
    toggleAddressPanel,
    openAddressPanel,
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
    myListData,
    setMyListData,
    getMyListData,
    getUserDetails,
    setAddressMode,
    addressMode,
    addressId,
    setAddressId,
    searchData,
    setSearchData,
    windowWidth,
    setOpenFilter,
    openFilter,
    setIsFilterBtnShow,
    isFilterBtnShow,
    setOpenSearchPanel,
    openSearchPanel,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Cargando...</div>}>
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
              <Route
                path={"/my-list"}
                exact={true}
                element={
                  <ProtectedRoute>
                    <MyList />
                  </ProtectedRoute>
                }
              />
              <Route
                path={"/my-orders"}
                exact={true}
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path={"/order/success"}
                exact={true}
                element={<OrderSuccess />}
              />
              <Route
                path={"/order/failed"}
                exact={true}
                element={<OrderFailed />}
              />
              <Route
                path={"/address"}
                exact={true}
                element={
                  <ProtectedRoute>
                    <Address />
                  </ProtectedRoute>
                }
              />
              <Route path={"/search"} exact={true} element={<SearchPage />} />
              <Route
                path={"/s.tecnico"}
                exact={true}
                element={<ServicioTecnico />}
              />
              <Route path={"/nosotros"} exact={true} element={<Nosotros />} />
              <Route path={"/contacto"} exact={true} element={<Contacto />} />
              <Route
                path={"/factura/:id"}
                exact={true}
                element={
                  <ProtectedRoute>
                    <Factura />
                  </ProtectedRoute>
                }
              />
              <Route
                path={"/blog/firstblog"}
                exact={true}
                element={<FirstBlog />}
              />
              <Route
                path={"/blog/secondblog"}
                exact={true}
                element={<SecondBlog />}
              />
            </Routes>
          </Suspense>
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
