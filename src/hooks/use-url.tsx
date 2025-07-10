import { useEffect, useState } from "react";
import { useRefValue } from "./use-ref-value";

export function useUrl() {
  const [url, setUrl] = useState<string>(window.location.href);
  const refUrl = useRefValue(url);
  useEffect(() => {
    const interval = setInterval(() => {
      const newUrl = window.location.href;
      if (newUrl !== refUrl.current) {
        setUrl(newUrl);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [refUrl]);
  return url;
}
