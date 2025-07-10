import { browser } from "wxt/browser";
import type { BackgroundActions } from "../entrypoints/background/actions";

export async function callBackgroundAction<T extends keyof BackgroundActions>(
  type: T,
  payload: Parameters<BackgroundActions[T]>[0] = undefined,
): Promise<Awaited<ReturnType<BackgroundActions[T]>>> {
  const response = await browser.runtime.sendMessage({ type, payload });
  return response as Awaited<ReturnType<BackgroundActions[T]>>;
}

export const listenMessages = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  actions: Record<string, (...args: any[]) => Promise<any>>,
) => {
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    const { type, payload } = message;
    const handle = actions[type as keyof typeof actions];
    if (!handle) {
      return false;
    }
    Promise.resolve(handle(payload)).then(sendResponse);
    return true;
  });
};
