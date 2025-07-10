import { callBackgroundAction } from "@/lib/call-action";
import { BookmarkIcon, PencilIcon, SettingsIcon, XIcon } from "lucide-react";
import { useUpdater, useValue } from "../context";
import styles from "./style.module.css";

export function Buttons() {
  return (
    <div className={styles.buttons}>
      <div className={styles.placeholder} />
      <ButtonGroup />
    </div>
  );
}

function ButtonGroup() {
  const updater = useUpdater();
  const { status, noteId } = useValue();
  return (
    <div className={styles.buttonGroup}>
      {status === "new" && (
        <Button
          tooltip="Add Bookmark"
          onClick={() => {
            const html = `<header>${document.head.innerHTML}</header><body>${document.body.innerHTML}</body>`;
            updater((draft) => {
              draft.status = "pending";
            });
            callBackgroundAction("createNote", {
              url: window.location.href,
              html,
            }).then((res) => {
              if (res.error) {
                updater((draft) => {
                  draft.status = "error";
                });
              } else {
                updater((draft) => {
                  draft.status = "existing";
                  draft.noteId = res.id!;
                });
              }
            });
          }}
        >
          <BookmarkIcon />
        </Button>
      )}
      {status === "existing" && (
        <Button
          tooltip="Edit Bookmark"
          onClick={() => {
            callBackgroundAction("openNote", {
              noteId: noteId!,
            });
          }}
        >
          <PencilIcon />
        </Button>
      )}
      <Button
        tooltip="Settings"
        onClick={() => {
          callBackgroundAction("openSettings");
        }}
      >
        <SettingsIcon />
      </Button>
      <Button
        tooltip="Hide Hover Ball"
        onClick={() => {
          updater((draft) => {
            draft.showHoverBall = false;
          });
        }}
      >
        <XIcon />
      </Button>
    </div>
  );
}

function Button({
  children,
  onClick = () => {},
  tooltip = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
}) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {children}
      {tooltip && <div className={styles.tooltip}>{tooltip}</div>}
    </button>
  );
}
