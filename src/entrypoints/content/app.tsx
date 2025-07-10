import { useStorage } from "@/hooks/use-storage";
import { useUrl } from "@/hooks/use-url";
import ActionPanel from "./action-panel";
import { useValue } from "./context";
import { appOriginStorage, enableExtensionStorage } from "./storage";

export default function App() {
  const url = useUrl();
  const appOrigin = useStorage(appOriginStorage);
  const { showHoverBall } = useValue();
  const enableExtension = useStorage(enableExtensionStorage);
  return (
    <>
      {appOrigin &&
        !url.startsWith(appOrigin) &&
        enableExtension &&
        showHoverBall && <ActionPanel />}
    </>
  );
}
