import styles from "@/styles/components/search.module.scss";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import images from "@/assets/images";
export default function Search() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`/${username}`);
  };
  console.log(username);
  return (
    <div className={styles.wrapper}>
      <div
        data-aos="fade-up"
        data-aos-offset="320"
        data-aos-anchor-placement="top-bottom"
        className={styles.line}
      ></div>

      <form
        onSubmit={handlePress}
        data-aos="zoom-in-up"
        className={styles.searchInput}
      >
        <img src={images.logoPPG} alt="" />
        <span className={styles.title}>tabtab.link/</span>
        <input
          type="text"
          placeholder="yournamehere"
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
    </div>
  );
}
