import React from "react";
import styles from "@/styles/components/intro.module.scss";
import { Link } from "react-router-dom";
import images from "@/assets/images";

export default function Intro() {
  return (
    <div className={styles.wrapper} id="home">
      <div data-aos="zoom-in-up" className={styles.container}>
        <img src={images.bg} alt="" />
        <div className={styles.content}>
          <div className={styles.titleLg}>The Only Link You’ll Ever Need</div>
          <div className={styles.titleSm}>
            Connect audiences to all of your content with just one link
            <br />
            Already on TABTAB? Log in
          </div>
          <Link to="/admin">
            <button className={styles.btnStart}>GET START FOR FREE</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
