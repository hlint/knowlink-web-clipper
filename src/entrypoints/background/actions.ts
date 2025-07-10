import { browser } from "wxt/browser";
import { z } from "zod";
import { appAccessKeyStorage, appOriginStorage } from "../content/storage";

export const actions = {
  async openSettings() {
    browser.runtime.openOptionsPage();
  },
  async checkNoteExists({ url }: { url: string }) {
    const endpoint = await getEndpoint();
    const access_key = await getAccessKey();
    const searchParams = new URLSearchParams({
      url,
      access_key,
    });
    let response: Response;
    try {
      const controller = new AbortController();
      const abortTimeout = setTimeout(() => {
        controller.abort();
      }, 8000);
      response = await fetch(`${endpoint}?${searchParams.toString()}`, {
        signal: controller.signal,
      });
      clearTimeout(abortTimeout);
    } catch (_error) {
      return {
        error: "Request timeout",
      };
    }
    if (response.ok) {
      const data = await response.json();
      try {
        const { isExisting, noteId } = z
          .object({
            isExisting: z.boolean(),
            noteId: z.string().optional(),
          })
          .parse(data);
        return { isExisting, noteId };
      } catch (_error) {
        return {
          error: "Failed to parse response",
        };
      }
    }
    return {
      error: "Failed to check note exists",
    };
  },

  async createNote({ url, html }: { url: string; html: string }) {
    const endpoint = await getEndpoint();
    const access_key = await getAccessKey();
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        html,
        access_key,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      try {
        const { id } = z
          .object({
            id: z.string(),
          })
          .parse(data);
        actions.openNote({ noteId: id });
        return { id };
      } catch (_error) {
        return {
          error: "Failed to parse response",
        };
      }
    }
    return {
      error: "Failed to create note",
    };
  },

  async openNote({ noteId }: { noteId: string }) {
    const endpoint = await getEndpoint(`/note/${noteId}`);
    browser.tabs.create({
      url: endpoint,
    });
  },
};

export type BackgroundActions = typeof actions;

async function getEndpoint(path = "/api/web-clipper") {
  const appOrigin = await appOriginStorage.getValue();
  const url = new URL(path, appOrigin);
  return url.toString();
}

async function getAccessKey() {
  const accessKey = await appAccessKeyStorage.getValue();
  return accessKey;
}
