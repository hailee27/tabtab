/* eslint-disable jsx-a11y/alt-text */
import images from "@/assets/images";
import styles from "@/styles/layout/header.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { logOut } from "@/redux/reducer/loginReducer";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Divider, MenuList, Paper } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

export default function Header() {
  const user = useSelector((state) => state.login.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logOut());
    localStorage.clear();
    setAnchorEl(null);
  };
  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Link to="/">
            <div className={styles.logo}>
              <img src={images.logo} alt="" />
              <span className={styles.title}>Pink pig group</span>
            </div>
          </Link>
        </div>
        <div className={styles.center}></div>
        <div className={styles.right}>
          {user && (
            <>
              <Tooltip
                title={<h1>Tài khoản</h1>}
                sx={{ width: "100%", fontSize: "20px" }}
              >
                <div className={styles.setting}>
                  <Link to={`/${user?.username}`} target="_blank">
                    <img
                      src={
                        user.profilePicture ? user.profilePicture : images.user
                      }
                      className={styles.avatar}
                      alt=""
                    />
                    <span className={styles.name}>{user.username}</span>
                  </Link>
                </div>
              </Tooltip>
              <i className="fa-solid fa-caret-down" onClick={handleClick}></i>
            </>
          )}
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Paper sx={{ width: 220, maxWidth: "100%" }}>
          <MenuList>
            <Link to={`/${user?.username}`}>
              <MenuItem sx={{ width: "100%", fontSize: "20px" }}>
                <ListItemIcon>
                  <i
                    style={{ color: "#1877f2", width: "35px", padding: 0 }}
                    className="fa-solid fa-user"
                  ></i>
                </ListItemIcon>
                Trang cá nhân
              </MenuItem>
            </Link>
            <Link to={"/admin"}>
              <MenuItem
                sx={{ width: "100%", fontSize: "20px" }}
                onClick={handleClose}
              >
                <ListItemIcon>
                  <i
                    style={{ color: "#f7b928", width: "35px", padding: 0 }}
                    className="fa-solid fa-user-gear"
                  ></i>
                </ListItemIcon>
                Admin
              </MenuItem>
            </Link>
            <Link to={"/admin/card"}>
              <MenuItem
                sx={{ width: "100%", fontSize: "20px" }}
                onClick={handleClose}
              >
                <ListItemIcon>
                  <i
                    style={{ color: "#39afd5", width: "35px", padding: 0 }}
                    className="fa-solid fa-address-card"
                  ></i>
                </ListItemIcon>
                Tạo thẻ
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem
              sx={{ width: "100%", fontSize: "20px" }}
              onClick={handleLogout}
            >
              <ListItemIcon>
                <i
                  style={{ color: "tomato", width: "35px", padding: 0 }}
                  className="fa-solid fa-right-from-bracket"
                ></i>
              </ListItemIcon>
              Logout
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to={`/${user?.username}`}>
          <MenuItem
            sx={{ width: "100%", fontSize: "20px" }}
            onClick={handleClose}
          >
            <i style={{ color: "#1877f2" }} className="fa-solid fa-user"></i>
            Trang cá nhân
          </MenuItem>
        </Link>
        <Link to={"/admin"}>
          <MenuItem
            sx={{ width: "100%", fontSize: "20px" }}
            onClick={handleClose}
          >
            <i
              style={{ color: "#f7b928" }}
              className="fa-solid fa-user-gear"
            ></i>
            Admin
          </MenuItem>
        </Link>
        <Link to={"/admin/card"}>
          <MenuItem
            sx={{ width: "100%", fontSize: "20px" }}
            onClick={handleClose}
          >
            <i
              style={{ color: "#39afd5" }}
              className="fa-solid fa-address-card"
            ></i>
            Tạo thẻ
          </MenuItem>
        </Link>
        <MenuItem
          sx={{ width: "100%", fontSize: "20px" }}
          onClick={handleLogout}
        >
          <i
            style={{ color: "tomato" }}
            className="fa-solid fa-right-from-bracket"
          ></i>
          Logout
        </MenuItem>
      </Menu> */}
    </header>
  );
}
