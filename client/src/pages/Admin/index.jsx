import styles from "@/styles/pages/admin.module.scss";
import * as React from "react";

import NewCard from "@/components/newCard/NewCard";
import useWindowDimensions from "@/hook/useWindowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, Suspense } from "react";
import { deleteCard, getCard, updateCard } from "@/redux/api";
import { Backdrop, CircularProgress } from "@mui/material";
import { storage } from "@/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Iphone = React.lazy(() => import("@/components/Iphone/Iphone"));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Admin() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [per, setPerc] = useState(null);
  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [idDeleted, setIdDeleted] = useState("");
  const [thumbDeleted, setThumbDeleted] = useState("");
  const [active, setActive] = useState(false);

  const { isFetching } = useSelector((state) => state.card);
  const cards = useSelector((state) => state.card.currentCards);
  const card = cards?.find((card) => card._id === id);
  const user = useSelector((state) => state.login?.user);
  const username = user?.username;
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const handleClickOpen = (id, thumbnail) => {
    setOpen(true);
    setIdDeleted(id);
    setThumbDeleted(thumbnail);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //deleteCard
  const handleDeleteCard = (id, thumbnail) => {
    setIsDeleted(true);
    setOpen(false);
    if (thumbnail.split("/")[2] !== "firebasestorage.googleapis.com") {
      deleteCard(dispatch, id, user._id, username);
      setIsDeleted(false);
    } else {
      const desertRef = ref(storage, thumbnail);
      deleteObject(desertRef)
        .then(() => {
          setIsDeleted(false);
          deleteCard(dispatch, id, user._id, username);
        })
        .catch((error) => {
          setIsDeleted(false);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, username: username, [name]: value });
  };
  //change values
  const handleUpdateMode = (card) => {
    setIsUpdate(true);
    setData(card);
    setId(card._id);
  };

  //updateCard
  const handleUpdate = (e) => {
    e.preventDefault();
    setIsUpdate(false);
    setFile(() => "");
    if (file) {
      if (card.thumbnail.split("/")[2] === "firebasestorage.googleapis.com") {
        const desertRef = ref(storage, card.thumbnail);
        deleteObject(desertRef)
          .then(() => {
            setIsDeleted(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
            updateCard(dispatch, id, link);
            setIsLoading(false);
          });
        }
      );
    } else {
      updateCard(dispatch, id, data);
    }
  };

  useEffect(() => {
    getCard(dispatch, username);
  }, [username, dispatch]);

  return (
    <div className={styles.wrapper}>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isFetching || isDeleted || isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={styles.left}>
        {width <= 800 && (
          <button
            className={styles.btnPreview}
            onClick={() => setActive(!active)}
          >
            {!active ? (
              <i className="fa-solid fa-eye">Preview</i>
            ) : (
              <i className="fa-solid fa-x"></i>
            )}
          </button>
        )}
        {isUpdate ? (
          <div className={styles.edit}>
            <div className={styles.editwrapper}>
              <form className={styles.formInput} onSubmit={handleUpdate}>
                <label htmlFor="inputPic" className={styles.thumbnail}>
                  {file ? (
                    <img src={URL.createObjectURL(file)} alt="" />
                  ) : (
                    <img src={data.thumbnail} alt="" />
                  )}
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
                      value={data.title}
                      type="text"
                      placeholder="Title"
                      name="title"
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.item}>
                    <i
                      style={{ color: "#f6b828" }}
                      className="fa-solid fa-link"
                    ></i>
                    <input
                      value={data.url}
                      type="text"
                      placeholder="url"
                      name="url"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button
                  className={styles.btnCancel}
                  onClick={() => setIsUpdate(false)}
                >
                  Cancel
                </button>
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        ) : (
          <NewCard />
        )}
        <div className={styles.dashboard}>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle sx={{ fontSize: "2.6rem", color: "tomato" }}>
              {"Do you want to delete this?"}
            </DialogTitle>
            <DialogActions>
              <Button sx={{ fontSize: "1.2rem" }} onClick={handleClose}>
                Disagree
              </Button>
              <Button
                sx={{ fontSize: "1.2rem" }}
                variant="contained"
                color="error"
                onClick={() => handleDeleteCard(idDeleted, thumbDeleted)}
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          {cards.map((card) => (
            <Accordion key={card._id}>
              <div className={styles.card}>
                <AccordionSummary
                  sx={{ width: "100%" }}
                  expandIcon={<ExpandMoreIcon sx={{ fontSize: 35 }} />}
                >
                  <div className={styles.thumbnail}>
                    <img src={card?.thumbnail} alt="" />
                  </div>
                  <div className={styles.title}>{card?.title}</div>
                </AccordionSummary>
              </div>

              <AccordionDetails
                sx={{ backgroundColor: "rgba(241, 156, 187, 0.1)" }}
              >
                <Typography sx={{ paddingTop: "10px" }}>
                  <Tooltip title={<h1>Delete</h1>} arrow>
                    <DeleteForeverIcon
                      sx={{ fontSize: 35, color: "red" }}
                      onClick={() => handleClickOpen(card._id, card.thumbnail)}
                    />
                  </Tooltip>
                  <Tooltip title={<h1>Edit</h1>} arrow>
                    <EditIcon
                      sx={{ fontSize: 35 }}
                      color="primary"
                      onClick={() => handleUpdateMode(card)}
                    />
                  </Tooltip>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
      <div className={cx("right", { active: active })}>
        <div className={styles.wrapper}>
          <Suspense
            fallback={
              <div>
                <CircularProgress color="inherit" value={per} />
              </div>
            }
          >
            <Iphone />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
