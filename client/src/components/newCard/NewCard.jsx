import styles from "@/styles/pages/admin.module.scss";
import images from "@/assets/images";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { createCard } from "@/redux/api";
import { storage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Alert, CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import socials from "@/data";

export default function NewCard() {
  const { isFetching, error } = useSelector((state) => state.card);
  const user = useSelector((state) => state.login.user);
  const [file, setFile] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [per, setPerc] = useState(null);
  const dispatch = useDispatch();
  const formRef = useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      username: user.username,
      userId: user._id,
      [name]: value,
    });
  };
  const handleCreateCard = (e) => {
    e.preventDefault();
    if (file) {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
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
            const link = { ...data, thumbnail: URL };
            createCard(dispatch, user._id, link);
            setIsLoading(false);
          });
        }
      );
    } else {
      createCard(dispatch, user._id, data);
    }
    setData(() => "");
    setFile(() => "");
    formRef.current.reset();
  };
  const handleSelect = (title, thumbnail, url) => {
    setFile(() => "");

    setData((prev) => {
      return {
        ...prev,
        title,
        thumbnail,
        url,
      };
    });
  };
  console.log(data);

  return (
    <div className={styles.edit}>
      <Snackbar open={error} autoHideDuration={2000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          <h2 style={{ margin: 0 }}>Cần phải điền đủ thông tin</h2>
        </Alert>
      </Snackbar>

      <div className={styles.editwrapper}>
        <div className={styles.socialWrapper}>
          {socials.map((social) => (
            <img
              key={social.id}
              className={styles.socialImg}
              src={social.thumbnail}
              alt=""
              onClick={() =>
                handleSelect(social.title, social.thumbnail, social.url)
              }
            />
          ))}
        </div>
        <form
          className={styles.formInput}
          onSubmit={handleCreateCard}
          ref={formRef}
        >
          <label htmlFor="inputPic" className={styles.thumbnail}>
            {(file && (
              <img src={URL.createObjectURL(file)} alt="No Images" />
            )) ||
              (data?.thumbnail && (
                <img src={data?.thumbnail} alt="No Images" />
              )) || <img src={images.noImage} alt="No Images" />}
          </label>
          <input
            id="inputPic"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className={styles.inputArea}>
            <div className={styles.item}>
              <i
                style={{ color: "#1877f2" }}
                className="fa-solid fa-address-card"
              ></i>

              <input
                type="text"
                value={data?.title}
                placeholder="Title here ..."
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className={styles.item}>
              <i style={{ color: "#f6b828" }} className="fa-solid fa-link"></i>
              <input
                type="text"
                value={data?.url}
                placeholder="url here ..."
                name="url"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit">
            {isFetching || isLoading ? (
              <CircularProgress size={15} color="error" />
            ) : (
              "Add"
            )}
          </button>
        </form>
        {isLoading && (
          <CircularProgress
            variant="determinate"
            value={per}
            sx={{ position: "absolute", right: "0" }}
          />
        )}
      </div>
    </div>
  );
}
