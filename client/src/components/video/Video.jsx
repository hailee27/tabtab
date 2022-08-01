import styles from "@/styles/components/video.module.scss";
import "aos/dist/aos.css";
import images from "@/assets/images";

export default function Video() {
  return (
    <div className={styles.wrapper} id="about">
      <div className={styles.video}>
        <div className={styles.left} data-aos="zoom-out-right">
          <img src={images.gif1} alt="" />
          <span>tabtab.link/yourname</span>
        </div>
        <div className={styles.right} data-aos="fade-left">
          <h1> Use it anywhere</h1>
          <p>
            Take your TABTAB wherever your audience is, to help them to discover
            all your important content.
          </p>
        </div>
      </div>
      <div className={styles.video}>
        <div className={styles.left} data-aos="fade-right">
          <h1> Create and customize in minutes</h1>
          <p>
            Connect your socials, website, store, podcast, events and more. It
            all comes together in a link in bio landing page designed to
            convert.
          </p>
        </div>
        <div className={styles.right} data-aos="zoom-out-left">
          <video
            muted
            autoPlay={"autoplay"}
            loop
            src="https://videos.ctfassets.net/lbsm39fugycf/4jcMGgBbI0ZkJxn9Wqy3DK/61f26c5d0e317799c58e48cd484ce1e6/linktree-causes-landing-page-hero-1.mp4"
          />
        </div>
      </div>
    </div>
  );
}
