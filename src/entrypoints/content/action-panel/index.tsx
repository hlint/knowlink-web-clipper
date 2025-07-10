import { useStorage } from "@/hooks/use-storage";
import { clamp } from "@/lib/number";
import { useMemo, useRef } from "react";
import Draggable from "react-draggable";
import { hoverBallPositionStorage } from "../storage";
import { Buttons } from "./buttons";
import HoverBall from "./hover-ball";
import styles from "./style.module.css";
import { useCheck } from "./use-check";

export default function ActionPanel() {
  useCheck();
  const hoverBallPosition = useStorage(hoverBallPositionStorage);
  const nodeRef = useRef<HTMLDivElement>(null);
  const positionFixed = useMemo(() => {
    const wh = window.innerHeight - 60;
    return Math.floor(clamp(hoverBallPosition, 60, wh));
  }, [hoverBallPosition]);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLElement>}
      axis="y"
      position={{ x: 0, y: positionFixed }}
      handle={`.${styles.hoverBall}`}
      grid={[1, 1]}
      scale={1}
      onStop={(_e, data) => {
        hoverBallPositionStorage.setValue(data.y);
      }}
    >
      <div className={styles.actionPanel} ref={nodeRef}>
        <HoverBall />
        <Buttons />
      </div>
    </Draggable>
  );
}
