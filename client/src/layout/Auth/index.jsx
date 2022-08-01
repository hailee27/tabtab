import Header from "./Header";
import styles from "@/styles/layout/defaultLayoutAdmin.module.scss";

export default function AuthLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
