import React, { useEffect } from "react";
import Intro from "@/components/intro/Intro";
import styles from "@/styles/pages/home.module.scss";
import Search from "@/components/search/Search";
import Video from "@/components/video/Video";
import ListUsers from "@/components/listUser/ListUsers";
import AOS from "aos";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      offset: 450,
      once: true,
    });
  }, []);
  return (
    <div className={styles.wrapper}>
      <Intro />
      <Search />
      <Video />
      <ListUsers />
    </div>
  );
}
