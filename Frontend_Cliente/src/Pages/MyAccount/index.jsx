import { Button, TextField } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const [formFields, setFormsFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token === null) {
      history("/");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormsFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU NOMBRE COMPLETO");
      return false;
    }

    if (formFields.email === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU CORREO ELECTRÓNICO");
      return false;
    }

    if (formFields.mobile === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU NÚMERO CELULAR");
      return false;
    }

    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then(
      (res) => {
        console.log(res);
        if (res?.error !== true) {
          setIsLoading(false);
          context.alertBox("success", res?.data?.message);

          setFormsFields({
            name: "",
            email: "",
            mobile: "",
          });
        } else {
          context.alertBox("error", res?.data?.message);
          setIsLoading(false);
        }
      }
    );
  };

  return (
    <section className="!py-5 w-full">
      <div className="container flex !gap-5">
        <div className="col1 w-[25%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[60%]">
          <div className="card bg-white !p-5 shadow-md rounded-md">
            <h2 className="!pb-3 font-bold font-[bold] text-[20px]">
              MI PERFIL
            </h2>
            <hr className="!text-[#b8b8b8]" />

            <form className="!mt-5" onSubmit={handleSubmit}>
              <div className="flex items-center !gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="NOMBRE COMPLETO"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                    disabled={isLoading === true ? true : false}
                    onChange={onChangeInput}
                  />
                </div>

                <div className="w-[50%]">
                  <TextField
                    type="email"
                    label="CORREO ELECTRONICO"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="email"
                    value={formFields.email}
                    disabled={true}
                    onChange={onChangeInput}
                  />
                </div>
              </div>

              <div className="flex items-center !mt-4 !gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="NUMERO CELULAR"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="mobile"
                    value={formFields.mobile}
                    disabled={isLoading === true ? true : false}
                    onChange={onChangeInput}
                  />
                </div>
              </div>

              <div className="flex items-center !gap-4 !mt-5 cursor-pointer">
                <Button
                  type="submit"
                  disabled={!valideValue}
                  className="btn-org btn-lg w-[250px] "
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "ACTUALIZAR PERFIL"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
