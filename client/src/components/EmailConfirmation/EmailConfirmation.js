import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const EmailConfirmation = (props) => {
  const [loading, setLoading] = useState(true);
  const [emailConfirmation, setEmailConfirmation] = useState(false);

  let history = useHistory();

  const successRedirect = () => {
    history.push("/login");
  };

  // TODO: enable user to request another confirmation email
  const resendEmail = () => {
    axios
      .post()
      .then((res) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    let match = props.location.pathname.split("/");
    let uid = match[match.length - 2];
    let token = match[match.length - 1];

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/email-confirmation/${uid}/${token}/`
      )
      .then((res) => {
        setEmailConfirmation(true);
        setLoading(false);
      })
      .catch((err) => {
        setEmailConfirmation(false);
        setLoading(false);
      });
  }, [history, props.location.pathname]);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{ marginTop: "10%" }}
          className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16"
        >
          <h1>
            {emailConfirmation
              ? "Success! You've successfully confirmed your email. You can now login."
              : "Unfortunate, you're token has expired or invalid."}
          </h1>
          <button
            className="rounded border-gray-300 p-2 w-32 bg-blue-700 text-white"
            onClick={emailConfirmation ? successRedirect : resendEmail}
          >
            {emailConfirmation ? "Login" : "Resend Email"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailConfirmation;
