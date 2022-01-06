import { useState } from "react";
import { MenuIcon, UserProfile } from "../Utils";
import httpPostLogout from '../../../API/HTTP/PostLogout';

export default function Navbar({ showTab, setShowTab }) {
  const [isHttpLoading, setIsHttpLoading] = useState(false);

  const logout = async (e) => {
    e.preventDefault();

    setIsHttpLoading(true);
    await httpPostLogout();
    setIsHttpLoading(false);
  };

  return (
    <div className="d-flex justify-content-between align-items-center px-2 py-3 bg-light" style={{ height: "8vh" }}>
      <LoadingLayer isHttpLoading={isHttpLoading} />

      <div className="d-flex justify-content-between align-items-center">
        <div
          className={`${showTab ? "d-none" : "d-flex mx-3"} justify-content-between align-items-center`}
          onClick={() => setShowTab(!showTab)}
        >
          <MenuIcon />
        </div>
        <div className="mx-2 fw-bold" style={{ fontSize: "1.1em" }}> Workspace Name </div>
        <div className="mx-2" style={{ fontSize: ".92em" }}> List </div>
        <div className="mx-2" style={{ fontSize: ".92em" }}> Board </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mx-3">
        <div className="mx-3" style={{ cursor: "pointer" }}>
          Share
        </div>

        <div className="d-inline-block">
          <div className="d-inline-block text-clickable">
            <UserProfile />

            <span className="mx-2 fw-bold">
              {JSON.parse(localStorage.getItem("user")).first_name}
            </span>
          </div>

          <div className="d-inline-block my-2" onClick={(e) => logout(e)}>
            /&nbsp; <span className="text-clickable"> Sign out </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const LoadingLayer = ({ isHttpLoading }) => {
  return (
    <div hidden={!isHttpLoading} style={{
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "grey",
      opacity: 0.4,
    }}>
      <div className="loading-spinner"></div>
      <h5 className="mt-3" style={{ marginLeft: "20px", color: "black" }}>
        Logging out ...
      </h5>
    </div>
  );
};
