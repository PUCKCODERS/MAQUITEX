import "./App.css";
import "./responsive.css";
import React, { useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { createContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Login = lazy(() => import("./Pages/Login"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Products = lazy(() => import("./Pages/Products"));
const ProductDetails = lazy(() => import("./Pages/Products/productDetails.jsx"));
const HomeSliderBanners = lazy(() => import("./Pages/HomeSliderBanners"));
const CategoryList = lazy(() => import("./Pages/Category"));
const SubCategoryList = lazy(() => import("./Pages/Category/subCatList.jsx"));
const Users = lazy(() => import("./Pages/Users"));
const Orders = lazy(() => import("./Pages/Orders"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const VerifyAccount = lazy(() => import("./Pages/VerifyAccount"));
const ChangePassword = lazy(() => import("./Pages/ChangePassword"));
const Profile = lazy(() => import("./Pages/Profile"));
const AddRams = lazy(() => import("./Pages/Products/addRams.jsx"));
const AddWeight = lazy(() => import("./Pages/Products/addWeight.jsx"));
const AddSize = lazy(() => import("./Pages/Products/addSize.jsx"));
const BannerV1List = lazy(() => import("./Pages/Banners/bannerV1List.jsx"));
const BlogList = lazy(() => import("./Pages/Blog/index.jsx"));
const BannerV2List = lazy(() => import("./Pages/Banners/bannerV2List.jsx"));
const Factura = lazy(() => import("./Pages/Orders/factura.jsx"));

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

  const suspenseFallback = (
    <div className="w-full h-screen flex items-center justify-center">
      Cargando...
    </div>
  );

  useEffect(() => {
    if (windowWidth < 992) {
      setisSidebarOpen(false);
      setSidebarWidth(100);
    } else {
      setSidebarWidth(20);
    }
  }, [windowWidth]);

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper transition-all duration-300 ${
                  !isSidebarOpen && "opacity-0"
                }`}
                style={{
                  width: isSidebarOpen
                    ? windowWidth < 992
                      ? "100%"
                      : `${sidebarWidth}%`
                    : "0px",
                }}
              >
                <Sidebar />
              </div>

              <div
                className={`contentRight !py-4 !px-5 transition-all duration-300 ${
                  isSidebarOpen && windowWidth < 992 && "opacity-0"
                }`}
                style={{
                  width:
                    isSidebarOpen && windowWidth >= 992
                      ? `${100 - sidebarWidth}%`
                      : "100%",
                }}
              >
                <Dashboard />
              </div>
            </div>
          </section>
        </Suspense>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/sign-up",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
          <SignUp />
        </Suspense>
      ),
    },
    {
      path: "/forgot-password",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
          <ForgotPassword />
        </Suspense>
      ),
    },
    {
      path: "/verify-account",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
          <VerifyAccount />
        </Suspense>
      ),
    },
    {
      path: "/change-password",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
          <ChangePassword />
        </Suspense>
      ),
    },
    {
      path: "/products",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
        </Suspense>
      ),
    },
    {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
        </Suspense>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
        </Suspense>
      ),
    },
    {
      path: "/subCategory/List",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
        </Suspense>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
        </Suspense>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
        </Suspense>
      ),
    },
    {
      path: "/factura/:id",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
                <Factura />
              </div>
            </div>
          </section>
        </Suspense>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
        </Suspense>
      ),
    },
    {
      path: "/product/:id",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
                <ProductDetails />
              </div>
            </div>
          </section>
        </Suspense>
      ),
    },
    {
      path: "/product/addRams",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
                <AddRams />
              </div>
            </div>
          </section>
        </Suspense>
      ),
    },
    {
      path: "/product/addWeight",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
                <AddWeight />
              </div>
            </div>
          </section>
        </Suspense>
      ),
    },
    {
      path: "/product/addSize",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
                <AddSize />
              </div>
            </div>
          </section>
        </Suspense>
      ),
    },
    {
      path: "/bannerV1/list",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
                <BannerV1List />
              </div>
            </div>
          </section>
        </Suspense>
      ),
    },
    {
      path: "/bannerV2/list",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
                <BannerV2List />
              </div>
            </div>
          </section>
        </Suspense>
      ),
    },
    {
      path: "/blog/list",
      exact: true,
      element: (
        <Suspense fallback={suspenseFallback}>
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
                <BlogList />
              </div>
            </div>
          </section>
        </Suspense>
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
