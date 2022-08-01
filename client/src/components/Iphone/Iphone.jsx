import * as React from "react";
import styles from "@/styles/components/iphone.module.scss";
import "aos/dist/aos.css";
import AOS from "aos";
import images from "@/assets/images";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { Backdrop } from "@mui/material";
import { getUser, updateUser } from "@/redux/api";
import { storage } from "@/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import CircularProgressWithLabel from "../CircularProgressWithLabel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Iphone() {
  const user = useSelector((state) => state.login?.user);
  const dataUser = useSelector((state) => state.user?.userCurrent);
  const cards = useSelector((state) =>
    state.card.currentCards.filter((card) => card._id !== user.cards)
  );
  const id = user._id;

  const [avatar, setAvatar] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [per, setPerc] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState(dataUser);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setAvatar(null);
    setCoverPic(null);
  };

  const handleUpdateAvatar = () => {
    setOpen(false);
    if (avatar) {
      if (user?.profilePicture) {
        const desertRef = ref(storage, dataUser.profilePicture);
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }
      const name = new Date().getTime() + avatar.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, avatar);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
          setIsLoading(true);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
            const link = { ...data, profilePicture: URL };
            updateUser(dispatch, id, link);
            setIsLoading(false);
            setPerc(null);
          });
        }
      );
    }
    setAvatar(null);
  };

  const handleUpdateCoverPic = () => {
    setOpen(false);
    if (coverPic) {
      if (dataUser?.coverPicture) {
        const desertRef = ref(storage, dataUser.coverPicture);
        deleteObject(desertRef)
          .then(() => {
            console.log("delete succ");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      const name = new Date().getTime() + coverPic.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, coverPic);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
          setIsLoading(true);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
            const link = { ...data, coverPicture: URL };
            updateUser(dispatch, id, link);
            setIsLoading(false);
            setPerc(null);
          });
        }
      );
    }
    setCoverPic(null);
  };

  useEffect(() => {
    getUser(dispatch, id);
    AOS.init({
      duration: 1000,
    });
    if (avatar || coverPic) {
      setOpen(true);
    }
    setData((prev) => {
      return {
        ...prev,
        userId: id,
      };
    });
  }, [avatar, coverPic, id, dispatch]);
  return (
    <div className={styles.wrapper}>
      {user && (
        <div className={styles.content}>
          <Backdrop
            open={isLoading}
            sx={{
              color: "#fff",
              zIndex: "10",
              position: "absolute",
              borderRadius: "20px",
            }}
          >
            <CircularProgressWithLabel color="inherit" value={per} />
          </Backdrop>
          {coverPic && (
            <div>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <img
                  className={styles.inputImage}
                  src={URL.createObjectURL(coverPic)}
                  alt=""
                />

                <DialogActions>
                  <Button
                    size="large"
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    color="success"
                    onClick={handleUpdateCoverPic}
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
          <label className={styles.picture} htmlFor="inputCoverPic">
            <i className="fa-solid fa-images"></i>
          </label>

          <img
            className={styles.coverPic}
            src={dataUser?.coverPicture ? dataUser?.coverPicture : images.imgBg}
            alt=""
          />

          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            id="inputCoverPic"
            onChange={(e) => setCoverPic(e.target.files[0])}
            onClick={(e) => (e.target.value = null)}
          />

          <span data-aos="fade-up" className={styles.avatar}>
            {avatar && (
              <div>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <img
                    className={styles.inputImage}
                    src={URL.createObjectURL(avatar)}
                    alt=""
                  />

                  <DialogActions>
                    <Button
                      size="large"
                      variant="contained"
                      color="error"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="large"
                      variant="outlined"
                      color="success"
                      onClick={handleUpdateAvatar}
                    >
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )}

            <img
              src={
                dataUser?.profilePicture
                  ? dataUser?.profilePicture
                  : images.user
              }
              alt=""
            />

            <label className={styles.camera} htmlFor="inputAvatar">
              <i className="fa-solid fa-camera"></i>
            </label>
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            id="inputAvatar"
            onChange={(e) => setAvatar(e.target.files[0])}
            onClick={(e) => (e.target.value = null)}
          />

          <div className={styles.container}>
            {cards.map((card, index) => (
              <a
                href={card.url}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  data-aos="zoom-out-up"
                  data-aos-offset="0"
                  className={styles.link}
                >
                  <img
                    className={styles.thumbnail}
                    src={card.thumbnail}
                    alt=""
                  />
                  <span className={styles.title}>{card.title}</span>
                </div>
              </a>
            ))}
          </div>
          <div className={styles.bgIphone}>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
}
