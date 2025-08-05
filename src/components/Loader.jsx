import styles from "./Loader.module.css";
import ModelWrapper from "./ModelWrapper";
import { ReactComponent as Logo } from "./Logo.svg";

function Loader() {
  return (
    <ModelWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Logo style={{ height: "73px", width: "120px" }} />
        <span className={styles.loader}></span>
      </div>
    </ModelWrapper>
  );
}
export default Loader;

export function ComponentLoader() {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContent}>
        <Logo style={{ height: "73px", width: "120px" }} />
        <span className={styles.loader}></span>
      </div>
    </div>
  );
}
