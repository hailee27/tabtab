import React from "react";
import images from "@/assets/images";
import { Link } from "react-router-dom";

const img = {
  objectFit: "contain",
  width: "100%",
  height: "100%",
};
const wrapper = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
  backgroundColor: "#fcb82f",
};

export default function Error() {
  return (
    <div style={wrapper}>
      <Link
        style={{
          position: "absolute",
          top: "250px",
          fontSize: "3.6rem",
          fontWeight: "700",
          color: "#fff",
          textDecoration: "underline",
        }}
        to="/"
      >
        Back
      </Link>
      <img style={img} src={images.error} alt="" />;
    </div>
  );
}
