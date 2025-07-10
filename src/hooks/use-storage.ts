import { useEffect, useState } from "react";
import type { WxtStorageItem } from "wxt/utils/storage";

export function useStorage<T, P extends Record<string, unknown>>(
  item: WxtStorageItem<T, P>,
) {
  const [value, setValue] = useState(item.fallback);
  useEffect(() => {
    item.getValue().then(setValue);
    const unwatch = item.watch((newValue) => {
      setValue(newValue);
    });
    return () => {
      unwatch();
    };
  }, [item]);
  return value;
}
