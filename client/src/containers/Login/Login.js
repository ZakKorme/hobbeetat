import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import authSlice from "../../store/slices/auth";
import hobbySlice from "../../store/slices/hobby";
import groupSlice from "../../store/slices/group";
import notificationSlice from "../../store/slices/notifications";

const Login = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (email, password) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login/`, {
        email,
        password
      })
      .then(res => {
        // We first check if the user has confirmed email
        let unreadNotifications = res.data.notifications.filter(
          notification => notification.is_seen === false
        );
        let readNotifications = res.data.notifications.filter(
          notifications => notifications.is_seen === true
        );
        if (res.data.user.is_confirmed) {
          dispatch(
            authSlice.actions.setAuthTokens({
              token: res.data.access,
              refreshToken: res.data.refresh
            })
          );
          dispatch(
            authSlice.actions.setAccount({
              user: res.data.user,
              hobbies: res.data.hobbies,
              groups: res.data.groups
            })
          );
          // Set Notifications
          dispatch(
            notificationSlice.actions.setUnreadNotifications({
              unread: unreadNotifications
            })
          );
          dispatch(
            notificationSlice.actions.setReadNotifications({
              read: readNotifications
            })
          );
          let last_hobby = res.data.user["last_accessed_hobby"]["hobby_title"]
            ? res.data.user["last_accessed_hobby"]["hobby_title"]
            : res.data.hobbies[0];

          let last_group = res.data.user["last_accessed_group"]
            ? res.data.user["last_accessed_group"]["name"]
            : res.data.groups ? res.data.groups[0] : null;
          dispatch(
            hobbySlice.actions.setHobby({
              hobby: last_hobby
            })
          );
          dispatch(
            groupSlice.actions.setGroupInfo({
              info: last_group
            })
          );
          setLoading(false);
          history.push("/home");
        } else {
          setLoading(false);
          setMessage("Please confirm your email!");
        }
      })
      .catch(err => {
        setLoading(false);
        setMessage(err);
        // setMessage(err.response.data.detail.toString());
      });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: values => {
      setLoading(true);
      handleLogin(values.email, values.password);
    },
    validationSchema: Yup.object({
      email: Yup.string().email().trim().required("Please enter your email!"),
      password: Yup.string().trim().required("Please enter your password!")
    }),
    validateOnBlur: false,
    validateOnChange: false
  });
  return (
    // LOGIN FORM: Antd components - required email and password fields
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1
          className="text-2xl font-medium text-primary mt-4 mb-12 text-center"
          style={{ color: "black" }}
        >
          Login 🔐
        </h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div className="space-y-4">
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email
              ? <div>
                  {formik.errors.email}
                </div>
              : null}
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password
              ? <div>
                  {formik.errors.password}{" "}
                </div>
              : null}
          </div>
          <div className="text-danger text-center my-2" hidden={false}>
            {message}
          </div>
          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="rounded border-gray-300 p-2 w-32 bg-blue-700 text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
