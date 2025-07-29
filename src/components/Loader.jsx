import styles from "./Loader.module.css";
import ModelWrapper from "./ModelWrapper";
import { ReactComponent as Logo } from "./Logo.svg";

function Loader() {
  return (
    <ModelWrapper>
      <Logo style={{ height: "73px", width: "120px" }} />
      <span className={styles.loader}></span>
    </ModelWrapper>
  );
}
export default Loader;
