import styles from "@/styles/layout/footer.module.scss";
import images from "@/assets/images";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className={styles.wrapper} id="footer">
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src={images.logoPPG} alt="" />
            <span className={styles.text}>PINK PIG GROUP</span>
          </div>
          <div className={styles.contact}>
            <h3> Follow us</h3>
            <span className={styles.icon}>
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-tiktok"></i>
            </span>
          </div>
          <Link to={"/admin"}>
            <button className={styles.btnStart}>GET START</button>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.content}>
            <ul>
              <h3>ABOUT US</h3>
              <li>CONTACT</li>
              <li>BLOG</li>
              <li>OTHER</li>
            </ul>
            <div className={styles.flag}>
              <img src={images.flag} alt="" />
            </div>
          </div>
          <h5>© 2022 TABTAB -PPG ! - All Rights Reserved.</h5>
        </div>
      </div>
    </div>
  );
}
