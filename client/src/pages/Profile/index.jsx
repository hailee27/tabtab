import React, { useEffect } from "react";
import styles from "@/styles/pages/profile.module.scss";
import images from "@/assets/images";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCard, getProfile } from "@/redux/api";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Profile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentCards, isFetching } = useSelector((state) => state.card);
  const profile = useSelector((state) => state.profile.profileCurrent);
  const username = location.pathname.split("/")[1];
  const cards = currentCards;

  useEffect(() => {
    getCard(dispatch, username);
    getProfile(dispatch, username);
  }, [dispatch, username]);
  return (
    <>
      {profile && (
        <div
          className={styles.wrapper}
          style={{
            backgroundImage:
              profile?.coverPicture === ""
                ? `url(${images.imgBg})`
                : `url(${profile?.coverPicture})`,
          }}
        >
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={isFetching}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <section className={styles.container}>
            <div className={styles.top}>
              <img
                className={styles.avatar}
                src={
                  profile?.profilePicture === ""
                    ? images.user
                    : profile?.profilePicture
                }
                alt=""
              />
              <h1 className={styles.name}>
                {profile?.username}
                <i className="fa-solid fa-circle-check"></i>
              </h1>
            </div>
            <div className={styles.bottom}>
              {cards.map((card, index) => (
                <a href={card.url} key={index} target="_blank" rel="noreferrer">
                  <div className={styles.link}>
                    <img
                      className={styles.thumbnail}
                      src={card.thumbnail}
                      alt=""
                    />
                    <h2 className={styles.title}>{card.title}</h2>
                  </div>
                </a>
              ))}
            </div>
            <div className={styles.contact}>
              <img className={styles.logo} src={images.logoBg} alt="contact" />
              <h1>Pink Pig Group</h1>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
