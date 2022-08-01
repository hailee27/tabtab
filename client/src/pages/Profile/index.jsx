import React, { useEffect } from "react";
import styles from "@/styles/pages/profile.module.scss";
import images from "@/assets/images";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCard, getProfile } from "@/redux/api";
import { Backdrop, CircularProgress } from "@mui/material";

import Error from "@/pages/Error";

export default function Profile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.currentCards);
  const { profileCurrent, isFetching } = useSelector((state) => state.profile);
  const username = location.pathname.split("/")[1];
  const profile = profileCurrent;

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
          <section className={styles.container}>
            <Backdrop
              sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={isFetching}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
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
      {!profile && <Error />}
    </>
  );
}
