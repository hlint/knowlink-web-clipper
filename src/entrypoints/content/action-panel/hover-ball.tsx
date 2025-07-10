import logo from "@/assets/icon.png";
import { useValue } from "../context";
import Status from "./Status";
import styles from "./style.module.css";

export default function HoverBall() {
  const { status } = useValue();
  const tooltip = status === "error" ? "Knowlink Config Error" : "";
  return (
    <div className={styles.hoverBall}>
      <img src={logo} alt="logo" className={styles.logo} />
      <Status />
      {tooltip && <div className={styles.tooltip}>{tooltip}</div>}
    </div>
  );
}
