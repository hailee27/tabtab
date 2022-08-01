import Header from "./Header";
import Footer from "./Footer";
import styles from "@/styles/layout/defaultLayout.module.scss";

export default function DefaultLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
