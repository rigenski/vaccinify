import "./App.css";
import { useEffect, useState } from "react";
import { Login } from "./components/Login";
import api from "./services/api";
import { Consultation } from "./components/Consultation";
import { Vaccination } from "./components/Vaccination";

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isLogout, setLogout] = useState(false);

  const handleAuth = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const config = {
        headers: { Authorization: "Bearer " + token },
      };

      api
        .get("/api/v1/auth/profile", config)
        .then((res) => {
          api.defaults.headers.common["Authorization"] = "Bearer " + token;

          setLogin(true);
        })
        .catch((err) => {
          localStorage.setItem("token", "");

          console.log("error: ", err.message);

          setLogin(false);
        });
    } else {
      setLogin(false);
    }
  };

  const handleLogout = () => {
    api.post("/api/v1/auth/logout").then(() => {
      setLogout(true);

      localStorage.clear();

      setTimeout(() => {
        setLogin(false);
        setLogout(false);
      }, 2000);
    });
  };

  useEffect(() => {
    handleAuth();
  }, []);

  if (isLogin) {
    return (
      <>
        <nav className="navbar navbar-dark bg-primary">
          <div className="container">
            <a href="/#" className="navbar-brand">
              Vaccine Media
            </a>
            <div className="d-flex align-items-center">
              {isLogout ? (
                <div className="alert alert-success py-1 m-0 me-2">
                  logout success
                </div>
              ) : (
                <></>
              )}
              <a
                href="/#"
                className="btn btn-danger"
                onClick={() => handleLogout()}
              >
                Logout
              </a>
            </div>
          </div>
        </nav>
        <main className="py-5 text-dark">
          <div className="container">
            <h2>Dashboard</h2>

            {/* CONSULTATIONS */}
            <h4 className="mt-5">My Consultation</h4>
            <Consultation />

            {/* VACCINE */}
            <h4 className="mt-5">My Vaccinations</h4>
            <Vaccination />
          </div>
        </main>
        <footer className="py-5"></footer>
      </>
    );
  } else {
    return <Login setLogin={(value) => setLogin(value)} />;
  }
}

export default App;
