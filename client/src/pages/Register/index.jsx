import styles from "@/styles/pages/login.module.scss";
import stylesRegister from "@/styles/pages/register.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/api";
import { CircularProgress, Alert } from "@mui/material";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.register.user);
  const { isFetching, error } = useSelector((state) => state.register);

  const handleRegister = (e) => {
    e.preventDefault();
    register(dispatch, { username, email, password });
  };
  useEffect(() => {
    if (user) {
      window.location.replace("/login");
    }
  });

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
            top: "160px",
            fontSize: "18px",
            color: "red",
          }}
        >
          username or email has been registered!!!
        </Alert>
      )}
      <div className={styles.container}>
        <div className={styles.right}>
          <div className={styles.content}>
            <h1>Welcome to Register</h1>
            <h4>Do you have a account?</h4>
            <Link to="/login">
              <button>Sign In</button>
            </Link>
          </div>
        </div>
        <div className={styles.left}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>REGISTER .</h1>
              <div className={styles.icon}>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-github"></i>
                <i className="fa-brands fa-twitter"></i>
              </div>
            </div>

            <form
              className={stylesRegister.formRegister}
              onSubmit={handleRegister}
            >
              <span>USERNAME</span>
              <input
                type="text"
                placeholder="Username here."
                onChange={(e) => setUsername(e.target.value)}
              />
              <span>EMAIL</span>
              <input
                type="email"
                placeholder="Email here."
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>PASSWORD</span>
              <input
                type="password"
                autoComplete="true"
                suggested="current-password"
                placeholder="Your password."
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">
                {isFetching ? (
                  <CircularProgress
                    size={35}
                    className={styles.progress}
                    sx={{
                      position: "absolute",
                      bottom: "-6px",
                      left: "165px",
                    }}
                  />
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
