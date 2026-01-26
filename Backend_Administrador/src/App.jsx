import "./App.css";
import "./responsive.css";
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { createContext, useState } from "react";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/Products/productDetails.jsx";

import HomeSliderBanners from "./Pages/HomeSliderBanners";

import CategoryList from "./Pages/Category";

import SubCategoryList from "./Pages/Category/subCatList.jsx";

import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";

import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";
import Profile from "./Pages/Profile";
import AddRams from "./Pages/Products/addRams.jsx";
import AddWeight from "./Pages/Products/addWeight.jsx";
import AddSize from "./Pages/Products/addSize.jsx";
import BannerV1List from "./Pages/Banners/bannerV1List.jsx";
import BlogList from "./Pages/Blog/index.jsx";
import BannerV2List from "./Pages/Banners/bannerV2List.jsx";
import Factura from "./Pages/Orders/factura.jsx";

const MyContext = createContext();

function App() {
  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [addres, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth] = useState(20);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    id: "",
  });

  useEffect(() => {
    if (windowWidth < 992) {
      setisSidebarOpen(false);
    }
  }, [windowWidth]);

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/sign-up",
      exact: true,
      element: (
        <>
          <SignUp />
        </>
      ),
    },
    {
      path: "/forgot-password",
      exact: true,
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/verify-account",
      exact: true,
      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    {
      path: "/change-password",
      exact: true,
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },
    {
      path: "/products",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <Products />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <CategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/subCategory/List",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <SubCategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <Users />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <Orders />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/factura/:id",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <Factura />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <Profile />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/:id",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <ProductDetails />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/addRams",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <AddRams />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/addWeight",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <AddWeight />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/addSize",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <AddSize />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/bannerV1/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <BannerV1List />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/bannerV2/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <BannerV2List />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/blog/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "" : "opacity-0"
                } transition-all duration-300`}
                style={{
                  width: isSidebarOpen === true ? `${sidebarWidth}%` : "0px",
                }}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300`}
                style={{
                  width:
                    isSidebarOpen === true ? `${100 - sidebarWidth}%` : "100%",
                }}
              >
                <BlogList />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);

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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        setUserData(res.data);
        if (res?.response?.data?.message === "NO HAS INICIADO SESIÓN") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          alertBox(
            "error",
            "SU SESIÓN HA EXPIRADO, POR FAVOR INICIE SESIÓN DE NUEVO",
          );
          window.location.href = "/login";
        }
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    getCat();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCat = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res?.data);
    });
  };

  const values = {
    isSidebarOpen,
    setisSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    alertBox,
    openAlertBox,
    setUserData,
    userData,
    addres,
    setAddress,
    catData,
    setCatData,
    getCat,
    windowWidth,
    setSidebarWidth,
    sidebarWidth,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

        <Toaster />
      </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext };
