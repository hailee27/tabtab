import React, { useState } from "react";
import styles from "@/styles/pages/card.module.scss";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import PdfCard from "@/components/pdfCard/PdfCard";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function Card() {
  const user = useSelector((state) => state.login?.user);
  const [name, setName] = useState(user?.username);
  const [size, setSize] = useState(6.8);
  const [file, setFile] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <PdfCard
          file={file}
          name={user.username}
          editName={name}
          size={size}
          checked={checked}
        />
      </div>
      <h4 style={{ margin: 0 }}>
        Your Link:
        <Link
          to={`/${name}`}
          style={{ color: "#8631da", textDecoration: "underLine" }}
        >
          https://tabtab.link/{name}
        </Link>
      </h4>
      <div className={styles.bottom}>
        <div className={styles.editCard}>
          <span className={styles.text}>Chọn avatar từ thiết bị của bạn</span>
          <div className={styles.wrapperLabel}>
            <label htmlFor="inputPic" className={styles.avatar}>
              <i className="fa-solid fa-circle-user"></i>
            </label>
            <input
              maxLength="20"
              style={{ display: "none" }}
              id="inputPic"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <IOSSwitch
              checked={!checked}
              onChange={() => setChecked(!checked)}
            />
          </div>
        </div>
        <div className={styles.editName}>
          <span>Thay đổi tên trên thẻ</span>
          <input
            type="name"
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.changeSize}>
            <span>Thay đổi kích thước tên</span>
            <i
              className="fa-solid fa-plus"
              onClick={() => setSize(size + 0.4)}
            ></i>

            <i
              className="fa-solid fa-minus"
              onClick={() => setSize(size - 0.4)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
