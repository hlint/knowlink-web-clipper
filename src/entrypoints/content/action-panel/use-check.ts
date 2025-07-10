import usePageFocus from "@/hooks/use-page-focus";
import { useUrl } from "@/hooks/use-url";
import { callBackgroundAction } from "@/lib/call-action";
import { useCallback, useEffect } from "react";
import { useUpdater } from "../context";

export function useCheck() {
  const url = useUrl();
  const updater = useUpdater();
  const check = useCallback(
    (urlNeedCheck: string) => {
      updater((d) => {
        d.status = "pending";
      });
      callBackgroundAction("checkNoteExists", { url: urlNeedCheck }).then(
        (res) => {
          if (res.error) {
            updater((d) => {
              d.status = "error";
            });
          } else {
            updater((d) => {
              d.status = res.isExisting ? "existing" : "new";
              d.noteId = res.noteId ?? null;
            });
          }
        },
      );
    },
    [updater],
  );
  usePageFocus(() => {
    check(url);
  });
  useEffect(() => {
    check(url);
  }, [url, check]);
}
