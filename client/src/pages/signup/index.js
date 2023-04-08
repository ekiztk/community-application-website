import { TextField, Button } from "components/form";
import React, { useEffect } from "react";
import { mainLogo } from "../../assets/img";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "store";
//begin form creation system

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  passwordConfirm: yup.string().required("required"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/users/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
    //onSubmitProps.resetForm();
    if (savedUser) {
      dispatch(
        setLogin({
          user: savedUser.data.user,
          token: savedUser.token,
        })
      );
      navigate("/");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(values);
    await register(values, onSubmitProps);
  };

  useEffect(() => {
    if (user && isAuth) {
      return navigate("/");
    }
  }, [user, isAuth, navigate]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="p-4 md:p-8 min-w-[80vh] md:min-w-[50vh] flex flex-col items-center justify-center">
        <img
          className="text-4xl lg:text-6xl object-contain max-h-16"
          src={mainLogo}
          alt="logo"
        />
        <h3 className="mb-4 md:mb-8">Welcome!</h3>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
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
                id="name"
                name="name"
                label="User Name"
                type="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
              />
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

              <TextField
                id="passwordConfirm"
                name="passwordConfirm"
                label="Confirm User Password"
                type="password"
                value={values.passwordConfirm}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              {/* <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("photo", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="border border-black mb-3 p-2 md:p-4">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                )}
              </Dropzone> */}

              <Button type="submit" success className="mx-auto text-center">
                Register
              </Button>
            </form>
          )}
        </Formik>
        <p className="text-sm font-semibold mt-4 pt-1 mb-0">
          {"Have an account? "}
          <Link
            to="/auth/login"
            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
