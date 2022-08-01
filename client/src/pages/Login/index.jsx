import styles from "@/styles/pages/login.module.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/redux/api";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Alert } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/admin");
    login(dispatch, { username, password });
  };
  const { isFetching, error } = useSelector((state) => state.login);
  return (
    <div className={styles.wrapper}>
      {error && (
        <Alert
          variant="outlined"
          severity="error"
          size={200}
          sx={{
            minWidth: "20%",
            position: "absolute",
            zIndex: "9999",
            top: "120px",
            fontSize: "18px",
            color: "red",
          }}
        >
          Wrong username or password!!!
        </Alert>
      )}
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>LOGIN .</h1>
              <div className={styles.icon}>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-github"></i>
                <i className="fa-brands fa-twitter"></i>
              </div>
            </div>

            <form className={styles.formLogin} onSubmit={handleLogin}>
              <span>USERNAME</span>
              <input
                type="text"
                placeholder="Username here."
                onChange={(e) => setUsername(e.target.value)}
              />
              <span>PASSWORD</span>
              <input
                type="password"
                placeholder="Your password."
                autoComplete="true"
                suggested="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button>
                {isFetching ? (
                  <CircularProgress
                    size={35}
                    className={styles.progress}
                    sx={{
                      position: "absolute",
                      bottom: "64px",
                      left: "165px",
                    }}
                  />
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
            <span className={styles.forgot}>Forgot Password ?</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.content}>
            <h1>Welcome to Login</h1>
            <h4>Do you have a account?</h4>
            <Link to="/register">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
