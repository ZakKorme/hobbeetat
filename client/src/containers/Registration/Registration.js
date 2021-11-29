import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import moment from "moment";

import SuccessBanner from "../../components/SuccessBanner/SuccessBanner";
import { LoadingButton } from "@mui/lab";
import { hobbyList } from "../../utils/hobbyList";

const Registration = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [hobbySelection, setHobbySelection] = useState(null);

  const history = useHistory();

  const handleRegistration = (values) => {
    const firstName = values["firstName"];
    const lastName = values["lastName"];
    const email = values["email"];
    const password = values["password"];
    const gender = values["gender"];
    const dateOfBirth = values["dateOfBirth"];

    console.log(hobbySelection);
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        gender: gender,
        date_of_birth: dateOfBirth,
        hobbies: hobbySelection,
      })
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          history.push("/login/");
        }, 2000);
      })
      .catch((err) => {
        setMessage(err.response.data.detail.toString());
      });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dateOfBirth: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      handleRegistration(values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().trim().required("Please enter your first name!"),
      lastName: Yup.string().trim().required("Please enter your last name!"),
      email: Yup.string().trim().email().required("Please enter your email!"),
      password: Yup.string()
        .trim()
        .min("6", "Your password is too short!")
        .max("20", "Your password is too long!")
        .required("Please enter your password!"),
      confirmPassword: Yup.string()
        .trim()
        .min("6", "Your password is too short!")
        .max("20", "Your password is too long!")
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both passwords need to be the same. "
          ),
        }),
      gender: Yup.string().trim().required("Please enter your gender!"),
      dateOfBirth: Yup.date()
        .test("dateOfBirth", "You must be at least 13 years old.", (value) => {
          return moment().diff(moment(value), "years") >= 13;
        })
        .required("Please enter your date of birth!"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
  });

  const userComponent = (
    <>
      <div className="flex flex-col mb-4 md:w-1/2">
        <input
          type="text"
          className=" border border-grey-light  p-3 rounded mb-4"
          name="firstName"
          placeholder="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.firstName ? (
          <p style={{ color: "red" }}>{formik.errors.firstName}</p>
        ) : null}
      </div>

      <div className="flex flex-col mb-4 md:w-1/2">
        <input
          type="text"
          className=" border border-grey-light  p-3 rounded mb-4"
          name="lastName"
          placeholder="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.lastName ? (
          <p style={{ color: "red" }}>{formik.errors.lastName}</p>
        ) : null}
      </div>
      <div className="flex flex-col mb-4 md:w-full">
        <input
          type="email"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email ? (
          <p style={{ color: "red" }}>{formik.errors.email}</p>
        ) : null}
      </div>

      <div className="flex flex-col mb-4 md:w-full">
        <input
          type="password"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password ? (
          <p style={{ color: "red" }}>{formik.errors.password}</p>
        ) : null}
      </div>

      <div className="flex flex-col mb-4 md:w-full">
        <input
          type="password"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.confirmPassword ? (
          <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>
        ) : null}
      </div>

      <div className="flex flex-col mb-4 md:w-full">
        <span className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
          Date of Birth
        </span>
        <input
          type="date"
          id="date"
          name="dateOfBirth"
          placeholder="Date Of Birth"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.dateOfBirth ? (
          <p style={{ color: "red" }}>{formik.errors.dateOfBirth}</p>
        ) : null}
      </div>
      <div className="flex flex-col mb-4 md:w-full">
        <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
          Gender
        </label>
        <div className="relative">
          <select
            className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 border rounded"
            id="gender"
            name="gender"
            placeholder="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option defaultValue value={"M"}>
              Male
            </option>
            <option value={"F"}>Female</option>
          </select>
        </div>
        {formik.errors.gender ? (
          <p style={{ color: "red" }}>{formik.errors.gender}</p>
        ) : null}
      </div>
      <div className="flex flex-col mb-4 md:w-full">
        <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
          Hobbies
        </label>
        <div className="relative">
          <Autocomplete
            multiple
            onChange={(event, newValue) => {
              setHobbySelection(newValue);
            }}
            id="tags-outlined"
            options={hobbyList}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            limitTags={2}
            renderInput={(params) => (
              <TextField
                {...params}
                className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 border rounded"
                label={"Favorite Hobbies"}
                variant="outlined"
                placeholder="Hobbies"
              />
            )}
          />
        </div>
      </div>
      <div
        className="flex flex-col mb-4 md:w-full"
        style={{
          paddingTop: "20px",
        }}
      >
        {message ? <p style={{ color: "red" }}>{message}</p> : null}
        <LoadingButton
          type="submit"
          className="w-full border-gray-300 p-2 w-32 bg-blue-700 rounded text-white"
          loading={loading}
          loadingIndicator="Loading..."
          variant="contained"
        >
          Create Account
        </LoadingButton>
      </div>
    </>
  );

  return (
    // REGISTRATION FORM: tailwindcss components - registration values (firstName, lastName, email, password, dob, & gender)
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      {success ? (
        <SuccessBanner
          title={"You can now login."}
          body={"You've successfully created an account!"}
        />
      ) : null}
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Create a new account</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
            className="mb-4 md:flex md:flex-wrap md:justify-between"
            noValidate
          >
            {userComponent}
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            {" "}
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Registration;
