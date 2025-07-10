import { listenMessages } from "@/lib/call-action";
import { defineBackground } from "#imports";
import { actions } from "./actions";

export default defineBackground(() => {
  listenMessages(actions);
});
