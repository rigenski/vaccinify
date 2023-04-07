import React, { useState } from "react";
import api from "./../services/api";

export const Login = (props) => {
  const [id_card_number, setIdCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFailed, setLoginFailed] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const data = { id_card_number: id_card_number, password: password };

    api.get("/sanctum/csrf-cookie").then(() => {
      api
        .post("/api/v1/auth/login", data)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("regional", res.data.regional.district);

          setIdCardNumber("");
          setPassword("");
          setLoginFailed(false);

          props.setLogin(true);
        })
        .catch((err) => {
          setIdCardNumber("");
          setPassword("");
          setLoginFailed(true);

          console.log("error: ", err.message);
        });
    });
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <a href="/#" className="navbar-brand">
            Vaccine Media
          </a>
        </div>
      </nav>
      <main className="py-5 text-dark">
        <div className="container">
          <div className="mx-auto" style={{ width: "320px" }}>
            <h2>Login</h2>

            {/* LOGIN */}
            <form
              className="mt-4"
              action="#"
              method="post"
              onSubmit={(e) => handleLogin(e)}
            >
              <div className="mb-2">
                <label htmlFor="id_card_number" className="form-label">
                  ID Card Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id_card_number"
                  value={id_card_number}
                  onChange={(e) => setIdCardNumber(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-2">
                Login
              </button>
              {isLoginFailed ? (
                <div className="alert alert-danger py-2 mt-2">
                  ID Card Number or Password incorrect
                </div>
              ) : (
                <></>
              )}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
