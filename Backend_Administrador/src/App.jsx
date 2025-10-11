import "./App.css";
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { createContext, useState } from "react";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import AddProduct from "./Pages/Products/addProduct";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IoClose } from "react-icons/io5";
import Slide from "@mui/material/Slide";
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import AddHomeSlide from "./Pages/HomeSliderBanners/addHomeSlide";
import CategoryList from "./Pages/Category";
import AddCategory from "./Pages/Category/addCategory";
import SubCategoryList from "./Pages/Category/subCategory";
import AddSubCategory from "./Pages/Category/addSubCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";

import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";
import Profile from "./Pages/Profile";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyContext = createContext();

function App() {
  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  const [isOpentFullScreenPanel, setIsOpentFullScreenPanel] = useState({
    open: false,
    model: "",
  });

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
                  isSidebarOpen === true ? "!w-[20%]" : "!w-[0px] opacity-0"
                } transition-all duration-300`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 ${
                  isSidebarOpen === false ? "!w-[100%]" : "!w-[80%]"
                } transition-all duration-300`}
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
                  isSidebarOpen === true ? "!w-[20%]" : "!w-[0px] opacity-0"
                } transition-all duration-300`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 ${
                  isSidebarOpen === false ? "!w-[100%]" : "!w-[80%]"
                } transition-all duration-300`}
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
                  isSidebarOpen === true ? "!w-[20%]" : "!w-[0px] opacity-0"
                } transition-all duration-300`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 ${
                  isSidebarOpen === false ? "!w-[100%]" : "!w-[80%]"
                } transition-all duration-300`}
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
                  isSidebarOpen === true ? "!w-[20%]" : "!w-[0px] opacity-0"
                } transition-all duration-300`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 ${
                  isSidebarOpen === false ? "!w-[100%]" : "!w-[80%]"
                } transition-all duration-300`}
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
                  isSidebarOpen === true ? "!w-[20%]" : "!w-[0px] opacity-0"
                } transition-all duration-300`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 ${
                  isSidebarOpen === false ? "!w-[100%]" : "!w-[80%]"
                } transition-all duration-300`}
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
                  isSidebarOpen === true ? "!w-[20%]" : "!w-[0px] opacity-0"
                } transition-all duration-300`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 ${
                  isSidebarOpen === false ? "!w-[100%]" : "!w-[80%]"
                } transition-all duration-300`}
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
                  isSidebarOpen === true ? "!w-[20%]" : "!w-[0px] opacity-0"
                } transition-all duration-300`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 ${
                  isSidebarOpen === false ? "!w-[100%]" : "!w-[80%]"
                } transition-all duration-300`}
              >
                <Orders />
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
                  isSidebarOpen === true ? "!w-[20%]" : "!w-[0px] opacity-0"
                } transition-all duration-300`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight !py-4 !px-5 ${
                  isSidebarOpen === false ? "!w-[100%]" : "!w-[80%]"
                } transition-all duration-300`}
              >
                <Profile />
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
            "SU SESIÓN HA EXPIRADO, POR FAVOR INICIE SESIÓN DE NUEVO"
          );
          window.location.href = "/login";
        }
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const values = {
    isSidebarOpen,
    setisSidebarOpen,
    isLogin,
    setIsLogin,
    isOpentFullScreenPanel,
    setIsOpentFullScreenPanel,
    alertBox,
    openAlertBox,
    setUserData,
    userData,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

        <Dialog
          fullScreen
          open={isOpentFullScreenPanel.open}
          onClose={() =>
            setIsOpentFullScreenPanel({
              open: false,
            })
          }
          slots={{
            transition: Transition,
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() =>
                  setIsOpentFullScreenPanel({
                    open: false,
                  })
                }
                aria-label="close"
              >
                <IoClose className="!w-[30px] !h-[30px] !min-w-[30px] !ml-3 !rounded-full  !text-[#fff] !absolute !bg-[#030712] hover:!text-[#030712] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#fff] hover:!shadow-[0px_0px_0px_3px_#030712]" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className="text-[#fff] !ml-4 font-bold font-[bold] text-[25px]">
                  {isOpentFullScreenPanel?.model}
                </span>
              </Typography>
            </Toolbar>
          </AppBar>

          {isOpentFullScreenPanel?.model === "NUEVO PRODUCTO" && <AddProduct />}
          {isOpentFullScreenPanel?.model === "NUEVO SLIDE DE INICIO" && (
            <AddHomeSlide />
          )}
          {isOpentFullScreenPanel?.model === "NUEVA CATEGORÍA" && (
            <AddCategory />
          )}
          {isOpentFullScreenPanel?.model === "NUEVA SUBCATEGORÍA" && (
            <AddSubCategory />
          )}
        </Dialog>
        <Toaster />
      </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext };
