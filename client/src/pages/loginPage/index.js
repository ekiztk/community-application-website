import { TextField, Button } from "components/form";
import React from "react";
import { Link } from "react-router-dom";
import { mainLogo } from "../../assets/img";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email!").required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "http://localhost:3080/api/v1/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.data.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="p-4 md:p-8 min-w-[50vh] flex flex-col items-center justify-center">
        <img
          className="text-4xl lg:text-6xl object-contain max-h-16"
          src={mainLogo}
          alt="logo"
        />
        <h3 className="mb-4">Welcome back!</h3>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                id="email"
                name="email"
                label="User Mail"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              <TextField
                id="password"
                name="password"
                label="User Password"
                type="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <Link
                href="#!"
                className="inline-block mb-3 text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
              >
                Forgot password?
              </Link>
              <Button
                type="submit"
                style="success"
                className="w-full"
                text="Log In"
              />
            </form>
          )}
        </Formik>
        <p className="text-sm font-semibold mt-4 pt-1 mb-0">
          {"Don't have an account? "}
          <Link
            href="#!"
            className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
