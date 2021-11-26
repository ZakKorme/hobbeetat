import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { DataGrid } from "@mui/x-data-grid";
import SuccessBanner from "../../components/SuccessBanner/SuccessBanner";
import { LoadingButton } from "@mui/lab";
import Fade from "@mui/material/Fade";

const hobbies = [
  {
    id: 1,
    hobbyName: "Chess",
    hobbyCategory: "General Hobby",
    numberOfMembers: 12000,
  },
  {
    id: 2,
    hobbyName: "Cooking",
    hobbyCategory: "General Hobby",
    numberOfMembers: 100,
  },
  {
    id: 3,
    hobbyName: "Hunting",
    hobbyCategory: "General Hobby",
    numberOfMembers: 8000,
  },
  {
    id: 4,
    hobbyName: "Swimming",
    hobbyCategory: "General Hobby",
    numberOfMembers: 100000,
  },
];

const Registration = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hobbySelection, setHobbySelection] = useState(false);
  const [tableHobbySelection, setTableHobbySelection] = useState([]);
  const [hobbyFade, setHobbyFade] = useState(false);
  const [userFade, setUserFade] = useState(true);

  const [rows] = useState(hobbies);

  const history = useHistory();

  const handleRegistration = (values) => {
    const firstName = values["firstName"];
    const lastName = values["lastName"];
    const email = values["email"];
    const password = values["password"];
    const gender = values["gender"];
    const dateOfBirth = values["dateOfBirth"];
    const userHobbies = hobbies.filter((hobby) =>
      tableHobbySelection.includes(hobby.id)
    );

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        gender: gender,
        date_of_birth: dateOfBirth,
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

  // Hobby Selection Component
  const columns = [
    { field: "hobbyName", headerName: "Hobby", width: 130 },
    { field: "hobbyCategory", headerName: "Category", width: 130 },
    { field: "numberOfMembers", headerName: "Number of Members", width: 180 },
  ];

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
      <div
        className="flex flex-col mb-4 md:w-full"
        style={{
          paddingTop: "20px",
        }}
      >
        {message ? <p style={{ color: "red" }}>{message}</p> : null}
        <LoadingButton
          type="button"
          className="w-full border-gray-300 p-2 w-32 bg-blue-700 rounded text-white"
          loading={loading}
          loadingIndicator="Loading..."
          variant="contained"
          onClick={() => {
            setLoading(true);
            formik
              .validateForm()
              .then((res) => {
                if (
                  res.firstName ||
                  res.lastName ||
                  res.password ||
                  res.email ||
                  res.gender ||
                  res.dateOfBirth
                ) {
                  return;
                } else {
                  setUserFade(false);
                  setHobbySelection(true);
                  setHobbyFade(true);
                }
              })
              .catch((err) => console.log(err));
            setLoading(false);
          }}
        >
          Continue
        </LoadingButton>
      </div>
    </>
  );

  const hobbyComponent = (
    <div
      className="flex h-full w-full"
      style={{ minWidth: 500, flexDirection: "column" }}
    >
      <div className="flex flex-col mb-4 md:w-full">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          autoHeight
          onSelectionModelChange={(ids) => {
            setTableHobbySelection(ids);
          }}
        />
      </div>
      <div
        className="flex flex-col mb-4 md:w-full"
        style={{
          paddingTop: "20px",
        }}
      >
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
    </div>
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
        <div
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
          style={hobbySelection ? { minHeight: 500, minWidth: 600 } : null}
        >
          <h1 className="mb-8 text-3xl text-center">
            {hobbySelection
              ? "Select your favorite hobbies"
              : "Create a new account"}
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
            className="mb-4 md:flex md:flex-wrap md:justify-between"
            noValidate
          >
            {hobbySelection ? hobbyComponent : userComponent}
          </form>
        </div>
        {hobbySelection ? null : (
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
        )}
      </div>
    </div>
  );
};

export default Registration;
