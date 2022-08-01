import styles from "@/styles/components/listUser.module.scss";
import { httpRequest } from "@/utils/requestMethods";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import images from "@/assets/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/autoplay";

export default function ListUsers() {
  const [users, setUsers] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const res = await httpRequest("/user");
      setUsers(res.data);
    };
    getUser();
  }, []);

  return (
    <div className={styles.wrapper} data-aos="zoom-in-down">
      <div className={styles.title}>
        <h1 className={styles.titleLg}>Join the TABTAB community today</h1>

        <p className={styles.desc}>
          Join TABTAB and share everything you create, curate and sell online.
          All from the one link in bio.
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.card}>
          <Swiper
            slidesPerView={4}
            slidesPerGroup={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            freeMode
            modules={[Autoplay]}
            className="mySwiper"
          >
            {users &&
              users.map((user, index) => (
                <SwiperSlide key={index}>
                  <Link to={`/${user.username}`}>
                    {user?.coverPicture === "" ? (
                      <img
                        className={styles.cardImg}
                        src={images.image3}
                        alt=""
                      />
                    ) : (
                      <img
                        className={styles.cardImg}
                        src={user?.coverPicture}
                        alt=""
                      />
                    )}
                  </Link>
                  <div className={styles.name}>
                    {user?.profilePicture === "" ? (
                      <img
                        className={styles.avatar}
                        src={images.image5}
                        alt=""
                      />
                    ) : (
                      <img
                        className={styles.avatar}
                        src={user?.profilePicture}
                        alt=""
                      />
                    )}
                    <span className={styles.userName}> {user?.username}</span>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      <div
        className={styles.btn}
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-delay="1000"
      >
        <Link to={"/admin"}>
          <button>GET STARTED FOR FREE</button>
        </Link>
      </div>
    </div>
  );
}
