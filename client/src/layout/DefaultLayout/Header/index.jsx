/* eslint-disable jsx-a11y/alt-text */
import styles from "@/styles/layout/header.module.scss";
import images from "@/assets/images";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.login?.user);
  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Link to="/">
            <div className={styles.logo}>
              <img src={images.logo} alt="" />
              <span className={styles.title}>Pink pig group</span>
            </div>
          </Link>
        </div>
        <div className={styles.center}>
          <ul className={styles.list}>
            <a href="#home">
              <li>HOME</li>
            </a>
            <a
              href="https://blogppg1.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              <li>BLOG</li>
            </a>
            <a href="#footer">
              <li>CONTACT</li>
            </a>
            <a href="#about">
              <li> ABOUT</li>
            </a>
          </ul>
        </div>
        <div className={styles.right}>
          {user ? (
            <div className={styles.setting}>
              <Link to={`/${user?.username}`} target="_blank">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    className={styles.avatar}
                    alt=""
                  />
                ) : (
                  <img src={images.user} className={styles.avatar} alt="" />
                )}

                <span className={styles.name}>{user.username}</span>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login">
                <span className={styles.login}>Login</span>
              </Link>
              <Link to="/register">
                <button className={styles.btnSignUp}>SIGN UP FREE</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
