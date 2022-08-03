import React, { useRef, useState } from "react";

import styles from "@/styles/pages/card.module.scss";
import QRCode from "react-qr-code";
import images from "@/assets/images";
import listImage from "@/listImage";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import useWindowDimensions from "@/hook/useWindowDimensions";

export default function PdfCard({ file, name, editName, size, checked }) {
  const link = `${process.env.REACT_APP_BASE_URL}/${name}`;
  const [coverImage, setCoverImage] = useState(images.image5);
  const [fileImageCover, setFileImageCover] = useState(null);
  const { width } = useWindowDimensions();

  const input = useRef();

  const outputPdf = () => {
    html2canvas(input.current).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 108, 10, 98, 60);
      pdf.addImage(imgData, "PNG", 5, 10, 98, 60);
      pdf.setLineDash([1, 1], 10);
      pdf.line(0, 75, 560, 75);
      pdf.addImage(images.tutorial, "PNG", 5, 80, 200, 220);
      pdf.save("File.pdf");
    });
  };
  const handleChange = (image) => {
    setFileImageCover(null);
    setCoverImage(image);
  };
  return (
    <div className={styles.wrapperCard}>
      <div className={styles.card} ref={input}>
        {
          <img
            src={
              fileImageCover ? URL.createObjectURL(fileImageCover) : coverImage
            }
            alt=""
          />
        }

        <div className={styles.content}>
          {
            <div className={styles.avatar}>
              <img
                style={{ display: checked ? "none" : "" }}
                src={file ? URL.createObjectURL(file) : images.logoPPG}
                alt=""
              />
            </div>
          }

          {width >= 800 ? (
            <div className={styles.qrCode}>
              <QRCode size={150} level={"L"} value={link} />
            </div>
          ) : (
            <div className={styles.qrCode}>
              <QRCode size={70} level={"L"} value={link} />
            </div>
          )}

          <div
            className={styles.name}
            style={{
              fontSize:
                width <= 800 ? `${size - 4 + "rem"}` : `${size + "rem"}`,
            }}
          >
            {editName || name}
          </div>
        </div>
      </div>

      <ul className={styles.listImage}>
        {listImage.map((image, index) => (
          <li key={index} onClick={() => handleChange(image.src)}>
            <img className={styles.itemImage} src={image.src} alt="" />
          </li>
        ))}
      </ul>
      <div className={styles.wrapperBottom}>
        <h1>Xuất</h1>
        <button className={styles.btnPDF} onClick={outputPdf}>
          PDF
        </button>
        <h2>Thay đổi ảnh bìa </h2>
        <label htmlFor="inputCoverImage">
          <i className="fa-solid fa-panorama"></i>
        </label>
        <input
          style={{ display: "none" }}
          id="inputCoverImage"
          type="file"
          accept="image/*"
          onChange={(e) => setFileImageCover(e.target.files[0])}
        />
      </div>
    </div>
  );
}
