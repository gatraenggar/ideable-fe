import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpPutVerifyEmail from '../API/HTTP/PutVerifyEmail';
import httpGetUserStatus from '../API/HTTP/GetUserStatus';

export default function EmailVerification() {
  let { authToken } = useParams();
  const [isHttpLoading, setIsHttpLoading] = useState(true);
  const [httpError, setHttpError] = useState("");
  const [redirectPath, setRedirectPath] = useState("/login")

  useEffect(() => {
    verifyEmail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyEmail = async () => {
    const getEmailVerifResponse = await httpPutVerifyEmail(authToken);
    setIsHttpLoading(false);

    if (getEmailVerifResponse.status === "failed") {
      setHttpError(getEmailVerifResponse.message);
      return;
    }

    setHttpError("")

    const getUserStatusResponse = await httpGetUserStatus()
    if (getUserStatusResponse.status === "success") setRedirectPath("/dashboard")
  };

  return (
    <div className="shadow rounded row justify-content-center align-items-center px-5 py-4" style={{ width: '480px', minHeight: '300px', margin: '200px auto' }}>
      {
        isHttpLoading ?
          <VerificationLoading />
          :
          httpError === "" ?
            <VerificationSuccess redirectPath={redirectPath} />
            :
            <VerificationFail httpError={httpError} />
      }
    </div>
  );
}

const VerificationLoading = () => {
  return (
    <div>
      <h3 className="mb-3 text-center">
        Verifiying your email...
      </h3>
      <div className="d-flex justify-content-center align-items-center">
        <div className="loading-spinner"></div>
      </div>

      <div className="mt-2 text-center">
        <span>
          This should only takes a few seconds
        </span>
      </div>
    </div>
  );
};

const VerificationSuccess = ({ redirectPath }) => {
  return (
    <div>
      <h3 className="my-4 text-center">
        Your email has verified!
      </h3>

      <div className="mb-4 text-center">
        <span>
          Now you can close this tab safely or&nbsp;
        </span>

        <span className="text-decoration-underline text-clickable" onClick={() => window.location.href = redirectPath }>
          {
            redirectPath === "/dashboard" ?
              "continue to your dashboard"
              :
              "login to continue your works"
          }
        </span>
      </div>
    </div>
  );
};

const VerificationFail = ({ httpError }) => {
  return (
    <div className="mt-2 text-center">
      <h3 className="text-center">
        Oopss.. verification is failed!
      </h3>

      <div className="text-danger">
        {httpError}
      </div>
    </div>
  );
};